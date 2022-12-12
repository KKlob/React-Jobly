import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../ContextCreator';

function Homepage() {

    const { currUser } = useContext(UserContext);

    if (currUser) {
        return (
            <Container id="homepage" className="mt-5">
                <Row>
                    <Col>
                        <Card className="text-center border border-0">
                            <Card.Title className="fs-1">Welcome back to Jobly, {currUser.username}!</Card.Title>
                            <Card.Text>Ready to continue practicing your application skills?</Card.Text>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        return (
            <Container id="homepage" className="mt-5">
                <Row>
                    <Col>
                        <Card className="text-center border border-0">
                            <Card.Title className="fs-1">Welcome to Jobly!</Card.Title>
                            <Card.Text>Practice your job application skills here!</Card.Text>
                            <Card.Text><Button as={NavLink} to="/signup" className="me-3">Sign Up</Button><Button as={NavLink} to="/login">Login</Button></Card.Text>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Homepage;