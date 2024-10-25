import { useState } from "react";
import logo from "../Resources/music-notes-svgrepo-com.svg"
import { useNavigate } from "react-router-dom";
export default function Headder({setResponse}){
    const navigate=useNavigate();
    const [key,setKey]=useState("");
    function handlChange(e){
        setKey(e.target.value);
    }
   async function fire(){
        if(key.trim().length>=3){
            setKey(key.trim());
            const response=fetch(`https://saavn.dev/api/search/songs?query=${key}`)
            .then(async(res)=>{
                const data=await res.json();
                setResponse(data);
                navigate("/search")
            })
            .catch((e)=>{
                console.log(e);
            })
        }
   }
    return(
        <div className="headder-body">
            <div className="logo-container">
                <button onClick={()=>{
                    navigate('/')
                }}>
                <h1>
                <img src={logo} alt="app-logo" />
                    Music App
                </h1> 
                </button>
            </div>
            <div className="search-container">
                <input value={key} onChange={(e)=>handlChange(e)} type="text" placeholder="Search your songs here" />
                <button onClick={()=>{
                    fire();
                }}>Search</button>
            </div>
        </div>
    )
}