
import React, { useEffect, useState } from "react";
import "./CreateNote.css"
import { useDispatch, useSelector } from "react-redux";
import {particularNote , updatenote} from "./actions"
import { useNavigate,useParams } from "react-router-dom";


function UpdateNote(){
    const id  = useParams()

    const [title,setTitle]= useState("")
    const [content,setContent] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const updated = useSelector((state)=> state.updated)
    const {update} = updated

    const submitHandler = (e)=>{
        e.preventDefault()
        console.log(id,title,content)
        dispatch(updatenote(id.id,title,content))

    }

    

    useEffect(()=>{
        console.log(".............id from useeffect",id)
        dispatch(particularNote(id.id))
       setTimeout(() => {
        const a = JSON.parse(localStorage.getItem("updateNote"))
        console.log("updatedNote",a)
        const oldTitle = a.note.title
        const oldContent =a.note.content 
        setTitle(oldTitle)
        setContent(oldContent)
       
       }, 2000);
        
        
        if(update){
            alert("updated succussfully.....")
            
            setContent(()=>"")
            setTitle(()=>"")
            navigate("/posting")
            navigate(0)
        }
    
    },[dispatch,update])

    return(
        <div className="c-container">

            <div >
            <form onSubmit={submitHandler}>
                    <div id="l-container">
                    <h1 id="note">Edit Note</h1>
                    <input type="text" id="forInput"   value={title} onChange={((e)=>setTitle(e.target.value))} />
                    <textarea id="forArea"   value={content} onChange={((e)=>setContent(e.target.value))} />
                    <button type="submit" id="c-btn">submit</button>
                    </div>
                </form>
            </div>
        
        </div>
    )
}

export default UpdateNote