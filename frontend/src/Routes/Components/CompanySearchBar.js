import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

function CompanySearchBar({ setSearchTerm }) {

    function handleSubmit(evt) {
        evt.preventDefault();
        const search = evt.target[0].value;
        evt.target[0].value = "";
        setSearchTerm(search);
    }

    return (
        <Form className="mb-3" onSubmit={handleSubmit}>
            <InputGroup>
                <Form.Control type="search" placeholder="Search companies..."></Form.Control>
                <Button type="submit">Search</Button>
            </InputGroup>
        </Form>
    )
}

export default CompanySearchBar;