import ListView from './list'
import {Link, useParams} from 'react-router-dom'
import httpservice from '../services/httpService'
import React, { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Notes() {
  let params = useParams()
  let [notes, setNotes] = useState([]);

  let deleteNote = (timestamp) =>{
    let notesCurr = notes.filter(note => note.timestamp !== timestamp);
    setNotes(notesCurr)
  }

  useEffect(()=>{
    httpservice.get(`/notes/${params.username}`)
      .then(({data}) =>{ 
        setNotes(data);
      })
      .catch(function (error) {
        if (error.response) {
          setNotes([])
        }
      })
  }, [params.username])

  return (
      <div>
          {notes.length > 0 ? (
              <ListView notes={notes} deleteNote={deleteNote}/>
          ) : (
              <div className='m-4'>
                  <label className="display-8">
                      No notes present. Start your note&nbsp;
                      <Link to={`/create/${params.username}`}>
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
