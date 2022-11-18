import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const HowToUse = (props) => {
    return (
        <Modal
          {...props}
          onHide={props.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Better Notes!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>How to use Better Notes</h4>
            <p>
            <ul>
            <li>New Users - Choose a Username!<ul>
            <li>Click on <b><i>Start a new note right here!</i></b> home page. Enter unique username in pop up box opened.</li>
            <li>It will be checked and upated if username is availabe or not.</li>
            <li>If availabe, click <b><i>Write Now</i></b> and done. Else try repeating above steps again</li>
            </ul>
            </li>
            <li>All notes will be in <b><i>My Notes</i></b> section.</li>
            <li>Create a new Note from here by clicking <b><i>New Note</i></b> in Menu Bar.</li>
            </ul>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
};

export default HowToUse;
