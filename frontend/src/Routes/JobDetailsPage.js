import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import JoblyApi from '../api';
import { useParams } from 'react-router-dom';
import JobCard from './Components/JobCard';

function JobDetailsPage() {

    const { id } = useParams();

    const [job, setJob] = useState(null);

    useEffect(() => {
        async function getJobData() {
            const data = await JoblyApi.getJob(id);
            setJob(data);
        }
        if (!job) getJobData();
    }, [id, job, setJob]);

    return (
        <Container id="job_details_page" className="mt-5">
            <Row className="justify-content-center">
                <Col className="text-center">
                    <h1 className="text-decoration-underline">Job Details</h1>
                </Col>
            </Row>
            <Row className="justify-content-center mt-3">
                <Col xs={8}>
                    {job ? <JobCard data={job} noDetails={true} /> : null}
                </Col>
            </Row>
        </Container>
    )
}

export default JobDetailsPage;