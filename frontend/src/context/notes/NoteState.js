import React,{ useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host="http://localhost:5008"
const notesInitial=[]


  
  const [notes,setNotes]=useState(notesInitial)
  //get all notes
  const getNote=async()=>{
    //api add
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
       }
    });
   const json=await response.json()
    console.log(json)
    setNotes(json)
  
  }






//add
const addNote=async(title,description,tag)=>{
  //api add
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "auth-token":localStorage.getItem('token')
     },
      body: JSON.stringify({title,description,tag}), 
  });
  const note= await response.json({title,description,tag}); 
// console.log(json);

  // console.log("adding a new note")
  // const note={
  //   "_id": "65ed7cdc8d801d63a839e586",
  //   "user": "65e752b6f39b5c466f2c3b40",
  //   "title": title,
  //   "description": description,
  //   "tag": tag,
  //   "date": "2024-03-10T09:26:52.718Z",
  //   "__v": 0
  // }
  setNotes(notes.concat(note))

}
//delete
const deleteNote=async(id)=>{
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: {
    "Content-Type": "application/json",
    "auth-token":localStorage.getItem('token')
     },
  });
  const json=response.json();
  console.log(json)

  console.log("deleteing the note with id"+id);
  const newNote=notes.filter((note)=>{return note._id!==id})
  setNotes(newNote)



}
//edit
const editNote=async (id,title,description,tag)=>{
//api call
const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  method: "PUT",
  headers: {
  "Content-Type": "application/json",
  "auth-token":localStorage.getItem('token')
   },
    body: JSON.stringify({title,description,tag}), 
});
const json= response.json(); 
console.log(json)

var newNotes=JSON.parse(JSON.stringify(notes))
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if(element._id===id)
    {
      newNotes[index].title=title;
      newNotes[index].description=description;
      newNotes[index].tag=tag;
      break;
    }
    setNotes(newNotes)
  }
}

  return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>
        {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
