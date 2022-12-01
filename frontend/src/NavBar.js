import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink, redirect } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import { UserContext } from './ContextCreator';
import Button from 'react-bootstrap/Button';

function NavBar({ logout }) {

    const user = useContext(UserContext);

    function handleLogout() {
        logout();
        redirect('/');
    }

    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="text-white">Jobly</Navbar.Brand>
                <Nav>
                    <Stack gap={3} direction="horizontal">
                        <Nav.Link as={NavLink} to="/jobs" className="text-white">Jobs</Nav.Link>
                        <Nav.Link as={NavLink} to="/companies" className="text-white">Companies</Nav.Link>
                        {!user ? <Nav.Link as={NavLink} to="/signup" className="text-white">Sign Up</Nav.Link> : null}
                        {!user ? <Nav.Link as={NavLink} to="/login" className="text-white">Login</Nav.Link> : null}
                        {user ? <Nav.Link as={NavLink} to="/profile" className="text-white">{user.username}</Nav.Link> : null}
                        {user ? <Button onClick={handleLogout} variant="outline-danger">Logout</Button> : null}
                    </Stack>
                </Nav>
            </Container>
        </Navbar >
    )
}

export default NavBar;