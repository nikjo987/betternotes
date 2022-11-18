import React, { useState} from "react";
import Note from "./note";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {saveNoteForUser} from "../services/notesService";
import { useNavigate, useParams } from "react-router-dom";
import EditNoteInline from "./editNoteInline";

const ListView = (props) => {
    let [note, setNote] = useState({})
    let [currNotes, setCurrNotes] = useState(props.notes)
    let [showEdit, setShowEdit] = useState(false);
    let params = useParams();
    let navigate = useNavigate();

    let handleNoteChange = (e) =>{
        let currNote = note;
        
        if(e.target.name === "title"){
            setNote({...currNote, title: e.target.value});
        }
        
        if(e.target.name === "text"){
            setNote({...currNote, text: e.target.value});
        }
    }

    let onNoteEdited = async () =>{
        let checkNote = {
            username: params.username,
            text: note.text,
            createdTime: note.createdTime,
            updatedTime: new Date(),
            title: note.title,
            timestamp: note.timestamp
        }

        await saveNoteForUser(params.username, checkNote);
        let currnotes = [checkNote, ...currNotes.filter(note => note.timestamp !== checkNote.timestamp)]
        setCurrNotes(currnotes);
    }

    let currNoteClicked = (timestamp) =>{
        setShowEdit(true);
        setNote(...currNotes.filter(n=> n.timestamp === timestamp));
    }

    window.onpopstate = () =>{
        if(showEdit)
            navigate({pathname:`/mynotes/${params.username}`, search:'' });
    }
    return (
        <>
        {!showEdit ? <Row xs={"auto"} lg={"auto"} className="g-3 m-2">
            {currNotes.map((note) => (
                <Col key={note.timestamp || new Date().getTime()} xxl={"auto"}>
                    <Note key={note.timestamp} note={note} deleteNote={props.deleteNote} currNoteClicked={currNoteClicked}/>
                </Col>
            ))}
        </Row>
        : <EditNoteInline note={note} handleNoteChange={handleNoteChange} onNoteEdited={onNoteEdited} />}
        </>
    );
};

export default ListView;
