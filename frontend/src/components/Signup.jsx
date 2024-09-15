import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup()
{
    const navigate=useNavigate();
    const [newUsername,sertNewUsername]=useState("")
    const [newUserPassword,setNewUserPassword]=useState("");
    const [newUserConfirmPassword,setNewUserConfirmPassword]=useState("");
    return (
        <div>
            <input type="text" placeholder="username" onChange={(e)=>
                {
                    sertNewUsername(e.target.value);
                }
            }></input>
            <input type="password" placeholder="password" onChange={(e)=>
                {
                    setNewUserPassword(e.target.value);
                }
            }></input>
            <input type="text" placeholder="confirm password" onChange={(e)=>
                {
                    setNewUserConfirmPassword(e.target.value);
                }
            }></input>
            <button onClick={async()=>
                {
                    if (newUserPassword!=newUserConfirmPassword)
                    {
                        <div><h2>password doesent match</h2></div>
                    }
                    else{
                        const res=await axios.post("http://localhost:3000/mytodos/signup",{
                            username:newUsername,
                            passord:newUserConfirmPassword
                        })
                        console.log(res.data);
                        localStorage.setItem("token",res.data.token);
                        navigate("/");
                    }
                }
            }>signup</button>
        </div>
    )
}