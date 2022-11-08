import React from "react";
import { useState } from "react";
import {useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import httpservice from "../services/httpservice.js";
import { useNavigate } from 'react-router';

const EditNote = (props) => {
    const location = useLocation();
    console.log(location)
    let note = location.state.note;
    const navigate = useNavigate();

    let [noteText, setNoteText] = useState(note.text);
    let [noteTitle, setNoteTitle] = useState(note.title);
    let params = useParams()

    let onNoteEdited = () =>{
        let checkNote = {
            username: params.username,
            text: noteText,
            createdTime: note.createdTime,
            updatedTime: new Date(),
            title: noteTitle,
            timestamp: note.timestamp
        }

        httpservice.put(`/notes/${params.username}`, checkNote).then(({data}) =>{
            navigate(`/mynotes/${params.username}`)
        });
        
    }

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
                onClick={()=>onNoteEdited(note)}
            >
                <label className="display-8">Save</label>
            </button>
        </form>
    );
};

export default EditNote;
