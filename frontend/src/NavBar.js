import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import { UserContext } from './ContextCreator';
import Button from 'react-bootstrap/Button';

function NavBar({ logout }) {

    const { currUser } = useContext(UserContext);

    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/');
    }

    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="text-white">Jobly</Navbar.Brand>
                <Nav>
                    <Stack gap={3} direction="horizontal">
                        <Nav.Link as={NavLink} to="/jobs" className="text-white">Jobs</Nav.Link>
                        <Nav.Link as={NavLink} to="/companies" className="text-white">Companies</Nav.Link>
                        {!currUser ? <Nav.Link as={NavLink} to="/signup" className="text-white">Sign Up</Nav.Link> : null}
                        {!currUser ? <Nav.Link as={NavLink} to="/login" className="text-white">Login</Nav.Link> : null}
                        {currUser ? <Nav.Link as={NavLink} to="/profile" className="text-white">{currUser.username}</Nav.Link> : null}
                        {currUser ? <Button onClick={handleLogout} variant="outline-danger">Logout</Button> : null}
                    </Stack>
                </Nav>
            </Container>
        </Navbar >
    )
}

export default NavBar;