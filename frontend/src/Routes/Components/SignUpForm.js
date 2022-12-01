import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import JoblyApi from '../../api';
import Alert from 'react-bootstrap/Alert';
import { v4 as uuid } from 'uuid';

function SignUpForm({ signup }) {

    const [data, setData] = useState(null);
    const [errors, setErrors] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function getToken() {
            try {
                const token = await JoblyApi.signUpUser(data);
                signup({ userToken: token, username: data.username });
                navigate('/');
            } catch (err) {
                setErrors(err);
                console.log(err);
            }
        }

        if (data) getToken();

    }, [data, signup, navigate]);

    function handleSubmit(evt) {
        evt.preventDefault();
        const username = evt.target[0].value;
        const password = evt.target[1].value;
        const firstName = evt.target[2].value;
        const lastName = evt.target[3].value;
        const email = evt.target[4].value;
        setData({ username, password, firstName, lastName, email });
    }

    return (
        <>
            {errors ? errors.map(error => <Alert key={uuid()} variant="danger">{error}</Alert>) : null}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label style={{ display: "none" }}>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" className="text-center" />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label style={{ display: "none" }}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" className="text-center" />
                </Form.Group>

                <Form.Group controlId="formFirstName" className="mb-3">
                    <Form.Label style={{ display: "none" }}>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" className="text-center" />
                </Form.Group>

                <Form.Group controlId="formLastName" className="mb-3">
                    <Form.Label style={{ display: "none" }}>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" className="text-center" />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label style={{ display: "none" }}>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" className="text-center" />
                </Form.Group>

                <Button type="submit" className="mb-3">Sign Up!</Button>

                <p>Already have an account? log in <Link to="/login">Here!</Link></p>
            </Form>
        </>
    )
}

export default SignUpForm;