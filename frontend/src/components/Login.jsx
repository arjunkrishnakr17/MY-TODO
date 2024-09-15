import axios from "axios";
import {useState} from "react"
import { useNavigate } from "react-router-dom";
export function Login()
{
    const navigate=useNavigate();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [loginFailed,setLoginFailed]=useState(false);
    return (
        <div>
            <input type="text" placeholder="username" onChange={(e)=>
                {
                    setUsername(e.target.value);
                }
            }></input>
            <input type="password" placeholder="password" onChange={(e)=>
                {
                    setPassword(e.target.value);
                }
            }></input>
            <button onClick={async()=>
                {
                    console.log(username);
                    const res=await axios.post("http://localhost:3000/mytodos/signin",{
                        username:username,
                        password:password
                    })
                    console.log(res.data);
                    if (res.data.msg==="invalid user")
                    {
                        console.log("login failed");
                        setLoginFailed(true);
                    }
                    else{
                        localStorage.setItem("token",res.data.token);
                        console.log(localStorage.getItem("token"));
                        navigate("/");
                    }
                    
                }
            }>login</button>
            <h2>if you dont have an account create one here</h2>
            <button onClick={()=>
                {
                    navigate("/signup")
                }
            }>signup</button>
            {loginFailed && <LoginFailed setLoginFailed={setLoginFailed}/>}
        </div>
    )
}

function LoginFailed({setLoginFailed})
{
    // setLoginFailed(false)
    return(
        <h2>login failed</h2>
    )
}