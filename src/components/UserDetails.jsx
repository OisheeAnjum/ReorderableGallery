/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { RxCross2 } from 'react-icons/rx';
import { useParams } from 'react-router-dom';
import { Button, Divider, Input, SelectPicker } from 'rsuite';

export default function UserDetails() {
    const { empid } = useParams();
    const [data, setData] = React.useState(null);
    const fetch = async () => {
        await axios
            .get(`http://59.152.62.177:8085/api/Employee/IndividualEmployeeData/${empid}`)
            .then((response) => {
                setData(response.data.readEmployeeData[0]);
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
    };
    React.useEffect(() => {
        fetch();
    }, []);
    console.log(data);
    const initial = {
        firstName: '',
        lastName: '',
        employeeType: '',
        districeID: '',
    };
    const [credentials, setCredentials] = React.useState(initial);
    const credentialHandler = (name, value) => {
        setCredentials({ ...credentials, [name]: value });
    };
    const [editable, setEditable] = useState(false);
    const handleEdit = () => {
        setEditable(!editable);
    };

    const userView = () => {
        if (!editable) {
            return (
                <div className="border rounded p-3">
                    <Row>
                        <Col md={2}>
                            <b>First Name</b>
                        </Col>
                        <Col md={6}>
                            <b>{data?.firstName}</b>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col md={2}>
                            <b>Last Name</b>
                        </Col>
                        <Col md={6}>
                            <b>{data?.lastName}</b>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col md={2}>
                            <b>Type</b>
                        </Col>
                        <Col md={6}>
                            <b>{data?.employeeType}</b>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col md={2}>
                            <b>Division</b>
                        </Col>
                        <Col md={6}>
                            <b>{data?.disvision}</b>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col md={2}>
                            <b>District</b>
                        </Col>
                        <Col md={6}>
                            <b>{data?.district}</b>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col md={12}>
                            <Button size="sm" appearance="primary" onClick={handleEdit}>
                                Edit Info
                            </Button>
                        </Col>
                    </Row>
                </div>
            );
        }
        return (
            <div className="border rounded p-3">
                <Row>
                    <Col md={2}>
                        <b>First Name</b>
                    </Col>
                    <Col md={6}>
                        <Input
                            size="sm"
                            placeholder="Enter name"
                            name="firstName"
                            value="nameValue"
                            style={{ width: '100%' }}
                            onChange={(value) => credentialHandler('firstName', value)}
                        />
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col md={2}>
                        <b>Last Name</b>
                    </Col>
                    <Col md={6}>
                        <Input
                            size="sm"
                            placeholder="Enter name"
                            name="lastName"
                            value="nameValue"
                            style={{ width: '100%' }}
                            onChange={(value) => credentialHandler('lastName', value)}
                        />
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col md={2}>
                        <b>Type</b>
                    </Col>
                    <Col md={6}>
                        <SelectPicker
                            data={[
                                { label: 'Employee', value: 'Employee' },
                                { label: 'Admin', value: 'Admin' },
                            ]}
                            searchable={false}
                            style={{ width: '100%' }}
                            onChange={(value) => credentialHandler('employeeType', value)}
                        />
                    </Col>
                </Row>

                <Divider />
                <Row>
                    <Col md={2}>
                        <b>Division</b>
                    </Col>
                    <Col md={6}>
                        <SelectPicker
                            placeholder="Select division"
                            data={[]}
                            style={{ width: '100%' }}
                        />
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col md={2}>
                        <b>district</b>
                    </Col>
                    <Col md={6}>
                        <SelectPicker
                            placeholder="Select district"
                            data={[]}
                            style={{ width: '100%' }}
                            onChange={(value) => credentialHandler('districeID', value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="mt-3">
                        <Button size="sm" appearance="primary">
                            Save
                        </Button>
                        <Button size="md" appearance="subtle" onClick={handleEdit}>
                            <RxCross2 />
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    };

    return (
        <Container className="mt-4">
            <div className=" w-100 text-center mb-2">
                <h4>User Information</h4>
                {userView()}
            </div>
        </Container>
    );
}
