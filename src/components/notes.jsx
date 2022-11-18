import ListView from './list'
import {Link, useParams} from 'react-router-dom'
import React, { useState,useEffect } from 'react'
import {getNotesByUsername} from '../services/notesService';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './loader';

export default function Notes() {
  let params = useParams()
  let [notes, setNotes] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  let deleteNote = (timestamp) =>{
    let notesCurr = notes.filter(note => note.timestamp !== timestamp);
    setNotes(notesCurr)
  }

  useEffect(()=>{
    setIsLoading(true)
    getNotesByUsername(params.username)
      .then(({data}) =>{ 
        setIsLoading(false)
        setNotes(data);
      })
      .catch(function (error) {
        if (error.response) {
        setIsLoading(false)
        setNotes([])
        }
      })
  }, [params.username])

  return (
      <div>
          {isLoading? <Loader /> : ""}
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
