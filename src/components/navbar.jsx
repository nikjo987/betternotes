import {useState} from 'react'
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import {checkUsernameIsAvailable} from "../services/notesService";
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import HowToUse from './howtouse'


const OffcanvasExample= (props) =>  {
    let expand = 'md';
    const location = useLocation();

    let [checkUsername, setCheckUsername] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let isHomePage = location.pathname.includes("home");

    let checkAvailableUsername = (e) =>{
        e.preventDefault()
        
        checkUsernameIsAvailable(props.username)
            .then(({data}) => {
                if(data)
                    toast.success("Availble")
                else
                    toast.error("Umm! Unavailable")

            })
            .catch(({error}) => {
            })
    }

    let handleHowToUse = () =>{

    }

    return (
        <>
            <ToastContainer />
            <HowToUse show={show} handleClose={handleClose}/>
            <Navbar key={expand} bg="light" expand={expand} className="mb-3">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <label className="pointer-hover display-6"> Better Notes!</label>
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls={`offcanvasNavbar-expand-${expand}`}
                    />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title
                                id={`offcanvasNavbarLabel-expand-${expand}`}
                            >
                                Better Notes!
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {!isHomePage ? <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link className="pointer-hover" href={`/mynotes/${props.username}`}>
                                    <label
                                        aria-current="page"
                                        className="pointer-hover display-8"
                                    >
                                        My Notes
                                    </label>
                                </Nav.Link>
                                <Nav.Link className="pointer-hover"  href={`/create/${props.username}`}>
                                    <label
                                        aria-current="page"
                                        className="pointer-hover display-8"
                                    >
                                        New Note
                                    </label>
                                </Nav.Link> 
                            </Nav> : 
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                               <Nav.Link className="pointer-hover" onClick={() => setShow(true)}>
                                    <label
                                        aria-current="page"className="pointer-hover display-8">
                                        How to Use
                                    </label>
                                </Nav.Link> 
                            </Nav>}
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Check available usernames"
                                    className="me-2"
                                    aria-label="Search"
                                    value={checkUsername}
                                    onChange={(e) =>
                                        setCheckUsername(e.target.value)
                                    }
                                    style={{ width: "250px" }}
                                />
                                <Button 
                                    type='submit'
                                    variant="outline-success"
                                    onClick={checkAvailableUsername}
                                    onSubmit={checkAvailableUsername}
                                >
                                    Check!
                                </Button>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}

export default OffcanvasExample;
