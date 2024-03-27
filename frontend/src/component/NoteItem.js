import React,{useContext} from 'react';
import noteContext from "../context/notes/noteContext";
import Notes from './Notes';


const NoteItem = (props) => {
  const context=useContext(noteContext);
    const {deleteNote}=context;
   const {note,updateNote}=props;
  return (
    <div className='col-md-3'>
      {/* {note.title}
      {note.description} */}
      <div className="card my-3">
  <div className="card-body">
    <h4 className="card-title">{note.title}</h4>
    <p className="card-text">{note.description}  </p>
    <button onClick={()=>{deleteNote(note._id)}}>delete</button>
    <button onClick={()=>{updateNote(note)}}>edit</button>

  </div>
</div>
    </div>
  );
}

export default NoteItem;
