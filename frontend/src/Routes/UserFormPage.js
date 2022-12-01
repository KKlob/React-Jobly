import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';

function UserFormPage({ type, login = null, signup = null }) {

    return (
        <Container id="user_form_page" className="mt-5">
            <Row className="justify-content-center">
                <Col className="text-center">
                    {type === "login" ? <h1>Welcome Back!</h1> : <h1>Create a new account!</h1>}
                </Col>
            </Row>
            <Row className="justify-content-center mt-3">
                <Col xs={6} className="text-center">
                    {type === "login" ? <LoginForm login={login} /> : <SignUpForm signup={signup} />}
                </Col>
            </Row>
        </Container>
    )
}

export default UserFormPage;