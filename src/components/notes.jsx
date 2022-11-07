import React from 'react'
import { useState } from 'react'
import httpservice from '../services/httpservice'
import CreateNote from './createNote';
import ListView from './list'
import {Link, useParams} from 'react-router-dom'
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Notes() {
  let params = useParams()
  let [notes, setNotes] = useState([]);

  let deleteNote = (timestamp) =>{
    let notesCurr = notes.filter(note => note.timestamp !== timestamp);
    setNotes(notesCurr)
  }


  useEffect(()=>{
    console.log(notes)
    httpservice.get(`http://localhost:5000/notes/${params.username}`)
      .then(({data}) =>{ 
        setNotes(data);
      })
      .catch(function (error) {
        if (error.response) {
          setNotes([])
        }
      })
  }, [])

  return (
      <div>
          {notes.length > 0 ? (
              <ListView notes={notes} deleteNote={deleteNote}/>
          ) : (
              <div className='m-4'>
                  <label className="display-8">
                      No notes present. Start your note&nbsp;
                      <Link to="/create">
                          <label className="display-8 pointer-hover">
                              here.
                          </label>
                      </Link>
                  </label>
              </div>
          )}
      </div>
  );
}
