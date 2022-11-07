import Index from "./components/index";
import Header from "./components/header";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";
import "./App.css";
import CreateNote from "./components/createNote";
import Notes from "./components/notes";
import EditNote from "./components/editNode";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import OffcanvasExample from "./components/navbar";

function App() {
    // let username = window.location
    let [username, setUsername] = useState("");
    let locationUsername = window.location.href.split("/").at(-1);
    if (locationUsername !== username) {
        console.log(locationUsername);
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
