import { Button } from '@mui/material';
import { MDBDataTable } from 'mdbreact';
import React from 'react';
import axios from 'axios';

export default function User({ onClick }) {
    const [data, setData] = React.useState({
        columns: [
            {
                label: 'First Name',
                field: 'firstName',
                sort: 'asc',
                width: 150,
            },
            {
                label: 'Last Name',
                field: 'lastName',
                sort: 'asc',
                width: 270,
            },
            {
                label: 'Type',
                field: 'employeeType',
                sort: 'asc',
                width: 200,
            },
            {
                label: 'Division',
                field: 'disvision',
                sort: 'asc',
                width: 100,
            },
            {
                label: 'District',
                field: 'district',
                sort: 'asc',
                width: 150,
            },
            {
                label: 'Employee Id',
                field: 'empID',
                sort: 'asc',
                width: 100,
            },
        ],
        rows: [],
    });
    const fetch = async () => {
        await axios
            .get(`http://59.152.62.177:8085/api/Employee/EmployeeData`)
            .then((response) => {
                const adminData = response.data.readEmployeeData.filter(
                    (item) => item.employeeType.toLowerCase() === 'admin'
                );
                setData({
                    columns: [
                        {
                            label: 'First Name',
                            field: 'firstName',
                            sort: 'asc',
                            width: 150,
                        },
                        {
                            label: 'Last Name',
                            field: 'lastName',
                            sort: 'asc',
                            width: 270,
                        },
                        {
                            label: 'Type',
                            field: 'employeeType',
                            sort: 'asc',
                            width: 200,
                        },
                        {
                            label: 'Division',
                            field: 'disvision',
                            sort: 'asc',
                            width: 100,
                        },
                        {
                            label: 'District',
                            field: 'district',
                            sort: 'asc',
                            width: 150,
                        },
                        {
                            label: 'Employee Id',
                            field: 'empID',
                            sort: 'asc',
                            width: 100,
                        },
                    ],
                    rows: adminData,
                });
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
    };
    React.useEffect(() => {
        fetch();
    }, []);
    return (
        <div>
            <Button variant="outlined" onClick={onClick}>
                Add Admin
            </Button>
            <MDBDataTable striped bordered small data={data} />
        </div>
    );
}
