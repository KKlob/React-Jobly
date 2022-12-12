import React, { useState, useContext, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../../ContextCreator';
import JoblyApi from '../../api';
import Alert from 'react-bootstrap/Alert';

function UserForm({ updateUser }) {

    const { currUser } = useContext(UserContext);

    const [data, setData] = useState(null);
    const [alert, setAlert] = useState(null);
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({ firstName: currUser.firstName, lastName: currUser.lastName, email: currUser.email });

    useEffect(() => {
        async function pushUpdate() {
            const updatedUser = await JoblyApi.updateUser(data, currUser.username);
            updateUser(updatedUser);
            setAlert({ variant: "success", message: "Updates have been saved!" });
            setShow(true);
            setData(null);
        }
        if (data) pushUpdate();

    }, [data, currUser, setAlert, setShow, setData, updateUser]);

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.id]: evt.target.value });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        const firstName = evt.target[0].value;
        const lastName = evt.target[1].value;
        const email = evt.target[2].value;
        setData({ firstName, lastName, email });
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" onChange={handleChange} value={formData.firstName} />
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" onChange={handleChange} value={formData.lastName} />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={handleChange} value={formData.email} />
                </Form.Group>

                <Button type="submit">Save Changes</Button>
            </Form>
            {show ? <Alert variant={alert.variant} onClose={() => setShow(false)} dismissible>
                {alert.message}
            </Alert> : null}
        </>
    )
}

export default UserForm;