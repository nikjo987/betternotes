import "./App.css";
import { useState } from "react";
import Notes from "./components/notes";
import Index from "./components/index";
import EditNote from "./components/editNode";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateNote from "./components/createNote";
import OffcanvasExample from "./components/navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
    // let username = window.location
    let [username, setUsername] = useState("");
    let locationUsername = window.location.href.split("/").at(4);
    if (locationUsername !== username) {
        setUsername(locationUsername);
    }
    function setUsernameFromChild(username) {
        setUsername(username);
    }

    return (
        <BrowserRouter>
            <OffcanvasExample username={username}></OffcanvasExample>
            <Routes>
                <Route
                    exact
                    path="/create/:username"
                    element={<CreateNote />}
                />
                <Route 
                    exact 
                    path="/mynotes/:username" 
                    element={<Notes />} />
                <Route
                    exact
                    path="/edit/:username/:noteid"
                    element={<EditNote />}
                />
                <Route
                    exact
                    path="/home"
                    element={<Index setUsernameFromChild={setUsernameFromChild} />}
                />
                <Route
                    path="*"
                    element={<Navigate to="/home" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
