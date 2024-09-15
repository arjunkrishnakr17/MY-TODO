import {atom,selector} from "recoil"
import axios from "axios"
export const getTodo=atom({
    key:"todoAtom",
    default:selector({
        key:"todoSelector",
        get:async ()=>
        {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found. Redirecting to login...");
                return [];
            }
            else
            {
            const res=await axios.get("http://localhost:3000/mytodos",{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            });    
            console.log(res.data);
            return res.data; 
        }       
        }
    })
})

export const todo=atom({
    key:"todo",
    default:[]
})