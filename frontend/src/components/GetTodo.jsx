import { useRecoilValue, useSetRecoilState } from "recoil"
import { getTodo,} from "../store/atoms/todoAtoms"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CreateTodo } from "./CreateTodo";

export function GetTodo()
{
    const [flag,setFlag]=useState(true);
    const navigate=useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login"); 
        }
        else{
            navigate("/");
        }
    }, [localStorage.getItem("token"), navigate]);

    // const todos=useEffect(async ()=>
    // {
    //     console.log("hello from use effect at get todo")
    //     return await useRecoilValue(getTodo); 
    // },[]);
    const setTodo=useSetRecoilState(getTodo);
    // console.log(todos);
    const todos=useRecoilValue(getTodo);
    useEffect(()=>
    {
        const fetchedTodo=async()=>
        {
        const res=await axios.get("http://localhost:3000/mytodos",{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        });
        setTodo(res.data);
        setFlag(false);
        
    }   
    fetchedTodo();
    },[setTodo,navigate])
    
    if(flag)
    {
        return(
            <div>loading..</div>
        )
    }
    return (
        <div>
        <h2>My todos</h2>
        {
        todos.map(todo=>
        {
            return(
                <div key={todo._id}>
                    {todo.title}<br></br>
                    {todo.description}<br></br>
                    <button onClick={async ()=>
                        {
                            const id=todo._id;
                            const completed=!todo.completed
                            const updatedTodo=todos.map(t=>
                            {
                               return (t._id===todo._id)? {...t,completed:!t.completed} : t; 

                            }
                            )
                        const res= await axios.put("http://localhost:3000/mytodos",{
                            id:id,
                            completed:completed
                        },{
                            headers:{
                                Authorization:localStorage.getItem("token")
                            }
                        })
                        console.log(res.data);
                        setTodo(updatedTodo);    
                        }
                    }>
                        {(todo.completed)? "Completed":"Not completed"}
                    </button>
                    
                </div>
            )
        }
        )}
        <button onClick={async()=>
            {
                const res=await axios.delete("http://localhost:3000/mytodos",{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                })
                setTodo([]);
            }
        }>Delete all</button>

        <button onClick={()=>
                        {
                            localStorage.removeItem("token");
                            navigate("/login");
                        }
                    }>logout</button>
        </div>
    )
}