import React from 'react'
import Note from './note';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ListView = (props) => {
  
  return (
    <Row xs={1} lg={2} className="g-4">
      {props.notes.map(note => (
        <Col xxl={'auto'} key={note.title}>
        <Note  note={note} deleteNote={props.deleteNote}/>
        </Col>
      ))}
    </Row>
  );
}

export default ListView
