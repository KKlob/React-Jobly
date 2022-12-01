import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function CompanyCard({ data, noLink = false }) {
    return (
        <Card className="mb-3 p-3 text-white bg-dark">
            <Card.Title className="fs-2">{data.name}</Card.Title>
            <Card.Text className="mt-2">{data.description}</Card.Text>
            <Card.Text>{data.numEmployees} Total Employees</Card.Text>
            {noLink ? null : <Card.Text as={Link} className="text-white" to={`/companies/${data.handle}`}>Learn More</Card.Text>}
        </Card>
    )
}

export default CompanyCard;