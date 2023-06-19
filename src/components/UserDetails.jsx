/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { Button, Divider, Input, SelectPicker } from 'rsuite';

export default function UserDetails({ id }) {
    const [divisions, setDivisions] = useState(null);
    const [divisionData, setDivisionData] = React.useState(null);
    const [districts, setDistricts] = useState(null);
    const [districtData, setDistrictData] = React.useState(null);
    const [userData, setUserData] = useState(null);
    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        employeeType: '',
        districeID: '',
        divisionId: '',
    });
    const [editable, setEditable] = useState(false);

    const handleEdit = () => {
        setEditable(!editable);
    };
    const fetchUser = async (userId) => {
        const res = await axios
            .get(`http://59.152.62.177:8085/api/Employee/IndividualEmployeeData/${userId}`)
            .then((response) => response)
            .catch((err) => err.response);
        if (res.status === 200) {
            setUserData(res.data.readEmployeeData[0]);
            setCredentials({
                firstName: res.data.readEmployeeData[0]?.firstName,
                lastName: res.data.readEmployeeData[0]?.lastName,
                employeeType: res.data.readEmployeeData[0]?.employeeType,
                districeID: res.data.readEmployeeData[0]?.districeID,
                divisionId: res.data.readEmployeeData[0]?.divisionId,
            });
        }
    };
    const fetchDivisions = async () => {
        const res = await axios
            .get(`http://59.152.62.177:8085/api/Employee/Division`)
            .then((response) => response)
            .catch((err) => err.response);
        if (res.status === 200) {
            setDivisions(res.data.readDivisionData);
        }
    };
    const fetchDistricts = async (divisionId) => {
        const res = await axios
            .get(`http://59.152.62.177:8085/api/Employee/District/${divisionId}`)
            .then((response) => response)
            .catch((err) => err.response);
        if (res.status === 200) {
            setDistricts(res.data.readDistrictData);
        }
    };
    const credentialHandler = (name, value) => {
        if (name === 'divisionId') {
            fetchDistricts(value);
            setCredentials({ ...credentials, [name]: value, districeID: '' });
        } else {
            setCredentials({ ...credentials, [name]: value });
        }
    };
    useEffect(() => {
        if (id && !userData) {
            fetchUser(id);
        }
        if (userData && !divisions) {
            fetchDivisions();
        }
        if (divisions) {
            const newData = divisions.map((item) => ({
                label: item.divisionName.toUpperCase(),
                value: item.divID,
            }));
            setDivisionData(newData);
        }
        if (userData && !districts) {
            fetchDistricts(userData.divisionId);
        }
        if (districts) {
            const newData = districts.map((item) => ({
                label: item.districtName.toUpperCase(),
                value: item.districtID,
            }));
            setDistrictData(newData);
        }
    }, [id, userData, divisions, districts]);
    const updateHandeler = async () => {
        await axios
            .put(
                `http://59.152.62.177:8085/api/Employee/UpdateEmployeeInformation/${id}`,
                credentials
            )
            .then((response) => {
                if (response.status === 200) {
                    toast.success(`User Updated Successfully`);
                    handleEdit();
                    fetchUser(id);
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
                            <b>{userData?.firstName}</b>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col md={2}>
                            <b>Last Name</b>
                        </Col>
                        <Col md={6}>
                            <b>{userData?.lastName}</b>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col md={2}>
                            <b>Type</b>
                        </Col>
                        <Col md={6}>
                            <b>{userData?.employeeType}</b>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col md={2}>
                            <b>Division</b>
                        </Col>
                        <Col md={6}>
                            <b>{userData?.disvision}</b>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col md={2}>
                            <b>District</b>
                        </Col>
                        <Col md={6}>
                            <b>{userData?.district}</b>
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
                            value={credentials?.divisionId}
                            style={{ width: '100%' }}
                            onChange={(value) => credentialHandler('divisionId', value)}
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
            <div className=" w-100 text-center mb-2">{userView()}</div>
        </Container>
    );
}
