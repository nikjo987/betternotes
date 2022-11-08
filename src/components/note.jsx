import React from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import Card from 'react-bootstrap/Card';
import httpService from '../services/httpservice'

const Note = (props) => {
    let params = useParams();
    const navigate = useNavigate();
    let editNote = () => {
        navigate(`/edit/${params.username}/${props.note.timestamp}`, {state:{note:props.note}});
    };

    let deleteNote = () =>{
        props.deleteNote(props.note.timestamp);
        httpService.delete(`/notes/${params.username}/${props.note.timestamp}`)
    }

    return (
        <Card className='card'>
            <Card.Img variant="top" src="https://picsum.photos/300" />
            <Card.Body>
                <Card.Title><label onClick={()=>editNote()} className='display-7 pointer-hover'>{props.note.title}</label></Card.Title>
                <Card.Text><label className='display-8'>{props.note.text}</label></Card.Text>
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
                    <button className="btn btn-outline-danger max-right" onClick={deleteNote}>Delete</button>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default Note
