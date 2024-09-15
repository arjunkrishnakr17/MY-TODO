import { useState } from "react"
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getTodo } from "../store/atoms/todoAtoms";

export function CreateTodo()
{
    const [flag,setFlag]=useState(false);
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const setTodos=useSetRecoilState(getTodo);
    return(
        <div>
            <h2>Create Todo</h2>
            <input type="text"placeholder="title" onChange={(e)=>
                {
                    setTitle(e.target.value);
                }
            }></input>
            <br></br>
            <input type="text" placeholder="Description" onChange={(e)=>
                {
                    setDescription(e.target.value);
                }
            }></input><br></br>
            <button onClick={async function()
                {
                    if (!localStorage.getItem("token")) {
                        navigate("/login"); 
                    }
                    else{

                    
                    const res = await axios.post(
                        "http://localhost:3000/mytodos/createtodo",
                        {
                          title: title,
                          description: description,
                          completed: false,
                        },
                        {
                          headers: {
                            Authorization:localStorage.getItem("token"),
                          },
                        }
                      );
                      console.log(res.data);
                      setTodos((oldTodo)=>[...oldTodo,{title:title,description:description,completed:false}]);
                      setFlag(true);
                }
                }
            }>submit</button> 
        </div>
    )
}