import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import httpservice from "../services/httpservice";

const CreateNote = (props) => {
    let params = useParams()
    let navigate = useNavigate();
    let [noteText, setNoteText] = useState("");
    let [noteTitle, setNoteTitle] = useState("");

    let saveNote = () => {
        httpservice.post(`http://localhost:5000/notes/${params.username}`, {
            username: params.username,
            text: noteText,
            createdTime: new Date(),
            updatedTime: new Date(),
            title: noteTitle,
            timestamp: new Date().getTime()
        });
        navigate(`/mynotes/${params.username}`)
    };

    return (
        <form>
            <div className="m-2">
                <label className="display-7 mx-4">
                    Easiest way to note and access across platforms!
                </label>
                <br/>
                <label className="display-8 mx-4 mb-4">Just remember your username.</label>
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

export default CreateNote;
