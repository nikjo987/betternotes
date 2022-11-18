import React from 'react'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Modal from './modal';


let Index = (props) => {
    let [nextLink, setNextLink] = useState('');
    let [username, setUsername] = useState('')
    let navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    let accessMyNotes = () => {
        if(username){
            props.setUsernameFromChild(username);
            navigate(`/mynotes/${username}`)
        }
    }

    return (
        <div>
            <Modal show={show} handleClose={handleClose}/>
            <label className="display-1 m-2">
                Welcome to the Better Notes!
            </label>
            <div className="m-4">
                <label className="col-sm-10 m-2 display-5">
                    Manage your notes with ease and simplicity.
                </label>
                <div className="col-sm-10 m-2">
                    <Link>
                        <label
                            className="display-6 pointer-hover"
                            onClick={() => {setNextLink("create"); handleShow(true)}}
                        >
                            Start a new note right here!
                        </label>
                    </Link>
                    <br />
                    <br />

                    <p className="display-8">
                        Already using Better Notes? Enter your &nbsp;
                        <input
                            type="text"
                            placeholder="Username"
                            className="display-8 form-control"
                            style={{
                                width: "200px",
                                display: "inline-block",
                            }}
                            onBlur={accessMyNotes}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
                        &nbsp;here.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Index