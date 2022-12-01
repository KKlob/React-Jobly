import React, { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';
import CompanyCard from './Components/CompanyCard';
import JobCard from './Components/JobCard';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../ContextCreator';

function CompanyDetailsPage() {

    const { handle } = useParams();

    const [companyData, setCompanyData] = useState(null);

    const user = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCompanyData() {
            const company = await JoblyApi.getCompany(handle);
            const allJobs = await JoblyApi.getAllJobs();
            const jobs = [];
            allJobs.forEach((job) => {
                if (job.companyHandle === handle) {
                    jobs.push(job);
                };
            });
            company.jobs = jobs;
            setCompanyData(company);
        }
        if (!user) navigate('/signup');
        if (!companyData) fetchCompanyData();
    }, [companyData, handle, user, navigate, setCompanyData]);

    if (user) return (
        <Container id="company_details_page" className="mt-5">
            <Row className="justify-content-center">
                <Col xs={10} className="text-center">
                    {companyData ? <CompanyCard data={companyData} noLink={true} /> : null}
                </Col>
            </Row>
            <Row xs={1} id="company_jobs" className="justify-content-center text-center">
                <h2 className="text-decoration-underline">Available Jobs</h2>
                {companyData ? companyData.jobs.map(job => <Col xs={8} key={uuid()}><JobCard data={job} /></Col>) : null}
            </Row>
        </Container>
    )

    return null;
}

export default CompanyDetailsPage;