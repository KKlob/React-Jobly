import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';
import CompanyCard from './Components/CompanyCard';
import JobCard from './Components/JobCard';
import { v4 as uuid } from 'uuid';

function CompanyDetailsPage() {

    const { handle } = useParams();

    const [companyData, setCompanyData] = useState(null);

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
        if (!companyData) fetchCompanyData();
    }, [companyData, handle, setCompanyData]);

    return (
        <Container id="company_details_page" className="mt-5">
            <Row className="justify-content-center">
                <Col xs={10} className="text-center">
                    {companyData ? <CompanyCard data={companyData} noLink={true} /> : null}
                </Col>
            </Row>
            <Row id="company_jobs" className="justify-content-center" xs={1}>
                <Col xs={6}>
                    {companyData ? companyData.jobs.map(job => <JobCard key={uuid()} data={job} />) : null}
                </Col>
            </Row>
        </Container>
    )
}

export default CompanyDetailsPage;