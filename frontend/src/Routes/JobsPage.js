import React, { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import JoblyApi from '../api';
import JobCard from './Components/JobCard';
import { v4 as uuid } from 'uuid';
import { UserContext } from '../ContextCreator';
import { useNavigate } from 'react-router-dom';

function JobsPage() {

    const [jobs, setJobs] = useState(null);

    const { currUser } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!currUser) navigate('/signup');
    }, [currUser, navigate]);

    useEffect(() => {
        async function getAllJobs() {
            const data = await JoblyApi.getAllJobs();
            setJobs(data);
        }
        if (!jobs) getAllJobs();
    }, [jobs, setJobs]);

    if (currUser && jobs) return (
        <Container id="jobs_page" className="mt-5">
            <Row className="justify-content-center">
                <Col className="text-center">
                    <h1 className="text-decoration-underline">Available Jobs</h1>
                </Col>
            </Row>
            <Row className="justify-content-center mt-3">
                <Col xs={6}>
                    {jobs ? jobs.map((job) => {
                        if (currUser.applications.includes(job.id)) { return (<JobCard key={uuid()} data={job} applied={true} />) }
                        else {
                            return (<JobCard key={uuid()} data={job} />)
                        }
                    }) : null}
                </Col>
            </Row>
        </Container>
    )

    return null;
}

export default JobsPage;