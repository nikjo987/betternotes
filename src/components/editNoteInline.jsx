import React from 'react'

const EditNoteInline =(props) => {
  return (
    <form>
    <div className="row m-2">
        <label className="col-sm-1 display-8">Title</label>
        <div className="col-sm-10">
            <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={props.note.title}
                onChange={(e) => props.handleNoteChange(e)}
            />
        </div>
    </div>
    <div className="row m-2">
        <label className="col-sm-1 display-8">Note</label>
        <div className="col-sm-10">
            <textarea
                type="text"
                className="form-control note-text"
                id="note"
                name="text"
                value={props.note.text}
                onChange={(e) => props.handleNoteChange(e)}
            />
        </div>
    </div>
    <div className="mb-1"></div>

    <button
        className="col-sm-1 m-4 btn btn-outline-primary"
        style={{ right: "0px", position: "absolute" }}
        onClick={props.onNoteEdited}
    >
        <label className="display-8">Save</label>
    </button>
    </form>
  )
}

export default EditNoteInline