import { Button } from '@mui/material';
import React from 'react';
import { Pagination, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function User({ onClick, data }) {
    const [activePage, setActivePage] = React.useState(5);
    const navigate = useNavigate();

    const detailsHandeler = (empid) => {
        navigate(`/user/details/${empid}`);
    };

    return (
        <div>
            <Button variant="outlined" onClick={onClick}>
                Add Admin
            </Button>
            <section className="mt-3">
                <Table responsive striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Type</th>
                            <th>Division</th>
                            <th>District</th>
                            <th>Employee Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((item, index) => (
                                <tr key={item.uuid}>
                                    <td>{index + 1}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.employeeType}</td>
                                    <td>{item.disvision}</td>
                                    <td>{item.district}</td>
                                    <td>{item.empID}</td>
                                    <td>
                                        <Button onClick={() => detailsHandeler(item.empID)}>
                                            Details
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                {console.log(data)}
                <Pagination
                    prev
                    last
                    next
                    first
                    size="xs"
                    total={data?.length}
                    limit={5}
                    activePage={activePage}
                    onChangePage={setActivePage}
                />
            </section>
        </div>
    );
}
