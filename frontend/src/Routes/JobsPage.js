import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import JoblyApi from '../api';
import JobCard from './Components/JobCard';
import { v4 as uuid } from 'uuid';

function JobsPage() {

    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        async function getAllJobs() {
            const data = await JoblyApi.getAllJobs();
            setJobs(data);
        }
        if (!jobs) getAllJobs();
    }, [jobs, setJobs]);

    return (
        <Container id="jobs_page" className="mt-5">
            <Row className="justify-content-center">
                <Col className="text-center">
                    <h1 className="text-decoration-underline">Available Jobs</h1>
                </Col>
            </Row>
            <Row className="justify-content-center mt-3">
                <Col xs={6}>
                    {jobs ? jobs.map(job => <JobCard key={uuid()} data={job} />) : null}
                </Col>
            </Row>
        </Container>
    )
}

export default JobsPage;