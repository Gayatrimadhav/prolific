import React,{useContext, useState} from 'react';
import noteContext from "../context/notes/noteContext";


const AddNote = () => {
    const context=useContext(noteContext);
    const {addNote}=context;
    const[note,setNote]=useState({title:"", description:"", tag:""})

    const clickhere=(e)=>{
      e.preventDefault();
      addNote(note.title,note.description,note.tag);
      setNote({title:"", description:"", tag:""})
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }
    return(
      <div className='container'>
     <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" value={note.title} name="title" onChange={onChange}/>
      </div>

      <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
    <input type="text" className="form-control" id="description"  value={note.description}name="description" onChange={onChange}/>
      </div>

      <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">tag</label>
    <input type="text" className="form-control" id="tag" name="tag"  value={note.tag}onChange={onChange}/>
      </div>

      

  <button disabled={note.title.length<5 || note.description.length<5 || note.tag.length<5 } type="submit" className="btn btn-primary" onClick={clickhere}>Addnote</button>
</form>
  </div>



   );
}

export default AddNote;
