import React from 'react'
import {useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import {deleteNoteByTimeStamp} from '../services/notesService';
import { Trash3Fill } from 'react-bootstrap-icons';

const Note = (props) => {
    let params = useParams();
    let editNote = () => {
        props.currNoteClicked(props.note.timestamp)
        // navigate(`/edit/${params.username}/${props.note.timestamp}`, {state:{note:props.note}});
    };

    let deleteNote = () =>{
        props.deleteNote(props.note.timestamp);
        deleteNoteByTimeStamp(params.username, props.note.timestamp)
    }

    return (
        <Card className='card'>
            <Card.Img variant="top" src="https://picsum.photos/300" />
            <Card.Body>
                <Card.Title><label onClick={editNote} className='display-7 pointer-hover hover-link'>{props.note.title}</label></Card.Title>
                <Card.Text><label className='display-8'>{props.note.text ? props.note.text.length>75? props.note.text.substr(0, 75)+ "...": props.note.text : ""}</label></Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <div>
                    <small className='me-auto'>
                        Updated{" "}
                        {Math.round(
                            (((new Date().getTime() -
                                new Date(props.note.updatedTime).getTime()) /
                                1000) %
                                3600) /
                                60
                        )}
                        mins ago.
                    </small>
                    <button className="btn btn-outline-danger max-right" onClick={deleteNote}><Trash3Fill/></button>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default Note
