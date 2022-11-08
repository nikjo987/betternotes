import "./App.css";
import { useState } from "react";
import Notes from "./components/notes";
import Index from "./components/index";
import EditNote from "./components/editNode";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateNote from "./components/createNote";
import OffcanvasExample from "./components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    // let username = window.location
    let [username, setUsername] = useState("");
    let locationUsername = window.location.href.split("/").at(-1);
    if (locationUsername !== username) {
        setUsername(locationUsername);
    }
    function setUsernameFromChild(username) {
        setUsername(username);
    }

    return (
        <BrowserRouter>
            {/* <Header username={username}/> */}
            <OffcanvasExample username={username}></OffcanvasExample>
            <Routes>
                <Route
                    exact
                    path="/home"
                    element={
                        <Index setUsernameFromChild={setUsernameFromChild} />
                    }
                />
                <Route
                    exact
                    path="/create/:username"
                    element={<CreateNote />}
                />
                <Route exact path="/mynotes/:username" element={<Notes />} />
                <Route
                    exact
                    path="/edit/:username/:noteid"
                    element={<EditNote />}
                />
                <Route
                    path="*"
                    element={
                        <Index setUsernameFromChild={setUsernameFromChild} />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
