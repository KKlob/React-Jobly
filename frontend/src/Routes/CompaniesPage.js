import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import JoblyApi from '../api';
import CompanyCard from './Components/CompanyCard';
import CompanySearchBar from './Components/CompanySearchBar';
import { v4 as uuid } from 'uuid';

function CompaniesPage() {

    const [searchTerm, setSearchTerm] = useState(null);

    const [companies, setCompanies] = useState(null);

    /** Grab All Companies from API. If companies already exist do nothing */
    useEffect(() => {
        async function getCompanies() {
            const data = await JoblyApi.getAllCompanies();
            setCompanies(data);
        }
        if (!companies) getCompanies();
    }, [companies, setCompanies]);

    /** Request all companies with searchTerm. If searchTerm is null do nothing */
    useEffect(() => {
        async function searchCompanies() {
            const data = await JoblyApi.searchCompanies(searchTerm);
            setCompanies(data);
        }
        if (searchTerm) searchCompanies();
    }, [searchTerm]);

    /** Clears searchTerm returning the company list to the full list */
    function clearSearchTerm() {
        setSearchTerm(null);
        setCompanies(null);
    }

    return (
        <Container id="companies_page" className="mt-5">
            <Row className="justify-content-center mb-3">
                <Col className="text-center">
                    <h1 className="text-decoration-underline">Companies</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={10}>
                    <CompanySearchBar setSearchTerm={setSearchTerm} />
                </Col>
            </Row>
            {searchTerm ? <Row className="justify-content-center mb-3">
                <Col className="text-center">
                    <Button variant="danger" onClick={clearSearchTerm}>Clear Search</Button>
                </Col>
            </Row> : null}
            <Row xs={1} className="justify-content-center">
                {companies ? companies.map(company => <Col key={uuid()} xs={8} className="text-center"><CompanyCard data={company} /></Col>) : null}
            </Row>
        </Container>
    )
}

export default CompaniesPage;