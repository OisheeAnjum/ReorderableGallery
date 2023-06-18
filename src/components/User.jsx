import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Drawer } from 'rsuite';
import UserDetails from './UserDetails';

export default function User({ data, divisionData, districtData }) {
    const [open, setOpen] = useState(false);
    const [id, setID] = useState(null);
    const detailHandeler = (value) => {
        setID(value);
        setOpen(true);
    };
    return (
        <div>
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
                                        <Button onClick={() => detailHandeler(item.empID)}>
                                            Details
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                <Drawer size="full" open={open} onClose={() => setOpen(false)}>
                    <Drawer.Header>
                        <Drawer.Title>
                            <h4>User Information</h4>
                        </Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <UserDetails
                            empID={id}
                            divisionData={divisionData}
                            districtData={districtData}
                        />
                    </Drawer.Body>
                </Drawer>
            </section>
        </div>
    );
}
