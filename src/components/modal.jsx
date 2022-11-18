import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {checkUsernameIsAvailable} from "../services/notesService";
import Loader from "./loader";

const RModal = (props) => {
    let [username, setUsername] = useState("");
    let [message, setMessage] = useState("");
    let [error, setError] = useState(false);
    let [isLoading, setIsLoading] = useState(false);

    let onUsernameChange = (e) => {
        setMessage("");
        setUsername(e.target.value) 
        setError(true)
    }

    let onUsernameBlur = async () => {
        if (username) {
            setMessage("");
            setIsLoading(true);
            let res =  await checkUsernameIsAvailable(username)
            if(res.status === 200 && res.data) {
                setError(false);
                setMessage("Username is available.");
                setIsLoading(false)
            } else {
                setError(true);
                setMessage("Username is already taken, please try another");
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
            >            
                <Modal.Header closeButton>
                    <Modal.Title>Taking your notes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className="display-9 m-2 bold-font">
                        Choose a Username for yourself
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={onUsernameChange}
                        className="form-control display-9 m-2 bold-font"
                        placeholder="Username"
                        onBlur={onUsernameBlur}
                    ></input>
                    {isLoading? <Loader center={'left:"46%"'}/> : ""}
                    {error && (
                        <i className="m-2" style={{ color: "red" }}>{message}</i>
                    )}
                    {!error && (
                        <i className="m-2" style={{ color: "green" }}>{message}</i>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Link
                        to={`/${props.nextLink}/${username}`}
                        style={
                            !username.length || error
                                ? { pointerEvents: "none" }
                                : {}
                        }
                    >
                        <Button variant="outline-primary"
                            disabled={error}
                        >
                            Write Now!
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RModal;
