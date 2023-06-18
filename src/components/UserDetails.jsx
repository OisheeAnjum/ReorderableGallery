/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Divider, Input, SelectPicker } from 'rsuite';

export default function UserDetails() {
    const navigate = useNavigate();
    const { empid } = useParams();
    const [data, setData] = React.useState(null);
    const [divisionData, setDivisionData] = React.useState(null);
    const [districtData, setDistrictData] = React.useState(null);
    const [division, setDivision] = React.useState(null);
    const [district, setDistrict] = React.useState(null);
    const [editable, setEditable] = useState(false);

    const handleEdit = () => {
        setEditable(!editable);
    };
    const fetchdata = async () => {
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
    // const [div, setDiv] = useState(data?.divisionId);
    const fetch = async () => {
        await axios
            .get(`http://59.152.62.177:8085/api/Employee/Division`)
            .then((response) => {
                setDivision(response.data.readDivisionData);
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
    };
    const [div, setDiv] = useState(data?.divisionId);
    const handleChangeDivision = async (value) => {
        setDiv(value);
        await axios
            .get(`http://59.152.62.177:8085/api/Employee/District/${value}`)
            .then((response) => {
                setDistrict(response.data.readDistrictData);
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
    };
    React.useEffect(() => {
        if (!division) {
            fetch();
        }
        if (division) {
            const newData = division.map((item) => ({
                label: item.divisionName.toUpperCase(),
                value: item.divID,
            }));
            setDivisionData(newData);
        }
        if (!district) {
            fetch();
        }
        if (district) {
            const newData = district.map((item) => ({
                label: item.districtName.toUpperCase(),
                value: item.districtID,
            }));
            setDistrictData(newData);
        }
    }, [division, district]);
    const [credentials, setCredentials] = React.useState(null);
    useEffect(() => {
        if (data) {
            setCredentials({
                firstName: data?.firstName,
                lastName: data?.lastName,
                employeeType: data?.employeeType,
                districeID: data?.districeID,
            });
        }
    }, [data]);
    React.useEffect(() => {
        if (!data) {
            fetchdata();
        }
    }, [data]);
    const credentialHandler = (name, value) => {
        setCredentials({ ...credentials, [name]: value });
    };
    const updateHandeler = async () => {
        await axios
            .put(
                `http://59.152.62.177:8085/api/Employee/UpdateEmployeeInformation/${empid}`,
                credentials
            )
            .then((response) => {
                if (response.status === 200) {
                    toast.success(`User Updated Successfully`);
                    handleEdit();
                    fetchdata();
                }
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
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
                            value={credentials?.firstName}
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
                            value={credentials?.lastName}
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
                            value={credentials ? String(credentials.employeeType) : '0'}
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
                            data={divisionData || []}
                            value={div}
                            style={{ width: '100%' }}
                            onChange={(value) => handleChangeDivision(value)}
                        />
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col md={2}>
                        <b>District</b>
                    </Col>
                    <Col md={6}>
                        <SelectPicker
                            data={districtData || []}
                            value={credentials?.districeID}
                            style={{ width: '100%' }}
                            onChange={(value) => credentialHandler('districeID', value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="mt-3">
                        <Button size="sm" appearance="primary" onClick={updateHandeler}>
                            Update
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
            <Button appearance="primary" onClick={() => navigate(-1)}>
                Go Back
            </Button>
            <div className=" w-100 text-center mb-2">
                <h4>User Information</h4>
                {userView()}
            </div>
        </Container>
    );
}
