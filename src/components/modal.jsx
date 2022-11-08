import React, { useState } from "react";
import { Link } from "react-router-dom";
import httpservice from "../services/httpservice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const RModal = (props) => {
    let [username, setUsername] = useState("");
    let [message, setMessage] = useState("");
    let [error, setError] = useState(false);

    let onUsernameChange = () => {
        if (username && props.nextLink === "create") {
            httpservice
                .get(
                    `/notes/isUsernameAvailable/${username}`
                )
                .then(({ data }) => {
                    if (data) {
                        setError(false);
                        setMessage("Username is available.");
                    } else {
                        setError(true);
                        setMessage(
                            "Username is already taken, please try another"
                        );
                    }
                })
                .catch(({ error }) => {
                    setError("Something went wrong. Please try again later.");
                });
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
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control display-9 m-2 bold-font"
                        placeholder="Username"
                        onBlur={onUsernameChange}
                    ></input>
                    {props.nextLink === "create" && error && (
                        <i style={{ color: "red" }}>{message}</i>
                    )}
                    {props.nextLink === "create" && !error && (
                        <i style={{ color: "green" }}>{message}</i>
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
