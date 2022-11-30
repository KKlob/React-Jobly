import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';

function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Jobly</Navbar.Brand>
                <Nav>
                    <Stack gap={3} direction="horizontal">
                        <Nav.Link as={NavLink} to="/jobs">Jobs</Nav.Link>
                        <Nav.Link as={NavLink} to="/companies">Companies</Nav.Link>
                        <Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>
                        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                    </Stack>
                </Nav>
            </Container>
        </Navbar >
    )
}

export default NavBar;