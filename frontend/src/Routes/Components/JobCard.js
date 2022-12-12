import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import { UserContext } from '../../ContextCreator';
import JoblyApi from '../../api';

function JobCard({ data, noDetails = false, applied = false }) {

    const { currUser, setCurrUser } = useContext(UserContext);

    const [apply, setApply] = useState(applied);

    useEffect(() => {
        async function applyToJob() {
            JoblyApi.token = currUser.token;
            try {
                const res = await JoblyApi.applyToJob(currUser.username, data.id);
                currUser.applications.push(data.id);
                setCurrUser(currUser);
            }
            catch (error) {
                console.log(error);
            }
        }
        if (apply && !currUser.applications.includes(data.id)) applyToJob();
    }, [currUser, setCurrUser, data, apply]);

    function handleApply(evt) {
        evt.preventDefault();
        if (!apply) setApply(true);
    }

    function formatSalary(salary) {
        return new Intl.NumberFormat("en-Us", {
            style: "currency",
            currency: "USD",
        }).format(salary);
    }

    function formatEquity(equity) {
        return new Intl.NumberFormat("en-US", {
            style: "percent",
            maximumFractionDigits: 3,
        }).format(equity);
    }

    return (
        <Card className="jobCard mb-3 p-3 text-white bg-dark text-center">
            <Card.Title className="fs-4">{data.title}</Card.Title>
            <Card.Text>{formatSalary(data.salary)} Yearly Salary</Card.Text>
            <Card.Text>{formatEquity(data.equity)} Equity Share</Card.Text>
            <Stack direction="horizontal" gap={3} className="justify-content-center">
                {noDetails ? null : <Card.Link className="text-white" as={Link} to={`/jobs/${data.id}`}>Job Details</Card.Link>}
                <Card.Link className="text-white" as={Link} onClick={handleApply}>{apply ? "Already Applied!" : "Apply!"}</Card.Link>
            </Stack>
        </Card>
    )
}

export default JobCard;