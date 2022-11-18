import React,{ useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import {saveNoteForUser, getNoteByTimestamp} from "../services/notesService";

const EditNote = (props) => {
    const navigate = useNavigate();
    let params = useParams()
    let [note, setNote] = useState()
    
    useEffect(() => {
        (async () => {
            let res = await getNoteByTimestamp(params.username, params.noteid);
            setNote(res.data);
        })();
    }, [params.username, params.noteid]);
    
    let onNoteEdited = async () =>{
        let checkNote = {
            username: params.username,
            text: note.text,
            createdTime: note.createdTime,
            updatedTime: new Date(),
            title: note.title,
            timestamp: note.timestamp
        }

        await saveNoteForUser(params.username, checkNote)
        navigate({pathname:`/mynotes/${params.username}`, search:'' })        
    }

    let handleNoteChange = (e) =>{
        let currNote = note;
        
        if(e.target.name === "title"){
            setNote({...currNote, title: e.target.value});
        }
        
        if(e.target.name === "text"){
            setNote({...currNote, text: e.target.value});
        }
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
                        name="title"
                        value={note?.title||''}
                        onChange={(e) => handleNoteChange(e)}
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
                        name="text"
                        value={note?.text||''}
                        onChange={(e) => handleNoteChange(e)}
                    />
                </div>
            </div>
            <div className="mb-1"></div>

            <button
                type="submit"
                className="col-sm-1 m-4 btn btn-outline-primary"
                style={{ right: "0px", position: "absolute" }}
                onClick={onNoteEdited}
            >
                <label className="display-8">Save</label>
            </button>
        </form>
    );
};

export default EditNote;
