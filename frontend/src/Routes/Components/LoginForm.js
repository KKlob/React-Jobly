import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import JoblyApi from '../../api';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

function LoginForm({ login }) {

    const [data, setData] = useState(null);
    const [errors, setErrors] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function getToken() {
            try {
                const token = await JoblyApi.loginUser(data);
                login({ userToken: token, username: data.username });
                navigate('/');
            } catch (err) {
                setErrors(err);
            }
        }

        if (data) getToken();

    }, [data, login, navigate]);

    function handleSubmit(evt) {
        evt.preventDefault();
        const username = evt.target[0].value;
        const password = evt.target[1].value;
        setData({ username, password });
    }

    return (
        <>
            {errors ? <Alert variant="danger">{errors}</Alert> : null}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label style={{ display: "none" }}>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" className="text-center" />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label style={{ display: "none" }}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" className="text-center" />
                </Form.Group>
                <Button type="submit" className="mb-3">Submit</Button>
                <p>Don't have an account? Sign up <Link to="/signup">Here!</Link></p>
            </Form>
        </>
    )
}

export default LoginForm;