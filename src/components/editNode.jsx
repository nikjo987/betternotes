import React from "react";
import { useState } from "react";
import httpservice from "../services/httpservice";
import { Link, useLocation, Route, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditNote = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    let note = location.state.note;
    let [noteText, setNoteText] = useState(note.text);
    let [noteTitle, setNoteTitle] = useState(note.title);
    // let [email, setEmail] = useState("");
    let params = useParams()

    let saveNote = () => {
        httpservice.put(`http://localhost:5000/notes/${params.username}`, {
            username: params.username,
            text: noteText,
            createdTime: note.createdTime,
            updatedTime: new Date(),
            title: noteTitle,
            timestamp: note.timestamp
        });
        
        navigate(`/mynotes/${params.username}`)
    };

    return (
        <form>
            <div className="m-2">
                <label className="display-7 m-4">
                    Set an username for yourself and get started with your note!
                </label>
            </div>

            <div className="row m-2">
                <label className="col-sm-1 display-8">Title</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={noteTitle}
                        onChange={({ target }) => setNoteTitle(target.value)}
                    />
                </div>
            </div>
            <div className="row m-2">
                <label className="col-sm-1 display-8">Note</label>
                <div className="col-sm-10">
                    <textarea
                        type="text"
                        className="form-control note-text"
                        id="note"
                        value={noteText}
                        onChange={({ target }) => setNoteText(target.value)}
                    />
                </div>
            </div>
            <div className="mb-1"></div>

            <button
                type="submit"
                className="col-sm-1 m-4 btn btn-outline-primary"
                style={{ right: "0px", position: "absolute" }}
                onClick={saveNote}
            >
                <label className="display-8">Save</label>
            </button>
        </form>
    );
};

export default EditNote;
