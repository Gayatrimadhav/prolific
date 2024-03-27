import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Notes = () => {
  const context = useContext(noteContext);
  var navigate = useNavigate();

  const { notes, getNote ,editNote} = context;

  useEffect(() => {
   if(localStorage.getItem('token')){
      getNote();
    }
    else{
      navigate("/login")

    }
    
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
	 setNote({id:currentNote._id,title:currentNote.title,description:currentNote.description,tag:currentNote.tag})
  };
  const ref = useRef(null);
  const [note, setNote] = useState({ id: "" ,title: "", description: "", tag: "" });


  const clickhere = (e) => {
	editNote(note.id,note.title,note.description,note.tag);
	e.preventDefault();
	// addNote(note.title, note.description, note.tag);

 };

 const onChange = (e) => {
	setNote({ ...note, [e.target.name]: e.target.value });
 };
  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
      >
        Open modal
      </button>
      <div className="modal" id="myModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Note</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control" value={note.title}
                    id="title"
                    name="title"
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description" value={note.description}
                    name="description"
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag" value={note.tag}
                    name="tag"
                    onChange={onChange}
                  />
                </div>

                  </form>
            </div>

            <div className="modal-footer">
              <button
                type="button" onClick={clickhere}
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2> Notes data:</h2>
        {/* //validation */}
        {notes.length===0 && "notes is empty"}

        {notes.map((note) => {
          // return note.title;
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
