import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function User({ onClick }) {
    const navigate = useNavigate();
    const [data, setData] = React.useState(null);
    const fetch = async () => {
        await axios
            .get(`http://59.152.62.177:8085/api/Employee/EmployeeData`)
            .then((response) => {
                const adminData = response.data.readEmployeeData.filter(
                    (item) => item.employeeType.toLowerCase() === 'admin'
                );
                setData(adminData);
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
    };
    React.useEffect(() => {
        fetch();
    }, []);
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
            </section>
        </div>
    );
}
