import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserContext } from '../ContextCreator';
import UserForm from './Components/UserForm';
import { useNavigate } from 'react-router-dom';

function ProfilePage({ updateUser }) {

    const user = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/');
    }, [user, navigate])

    if (user) return (
        <Container id="user_profile_page">
            <Row className="justify-content-center">
                <Col className="text-center">
                    <h1>Username: {user.username}</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={6} className="text-center">
                    <UserForm updateUser={updateUser} />
                </Col>
            </Row>
        </Container>
    )

    return null;
}

export default ProfilePage;