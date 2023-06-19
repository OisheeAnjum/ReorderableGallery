import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button, Form, Modal, Nav, SelectPicker } from 'rsuite';
import Employees from '../components/Employees';
import User from '../components/User';

export default function Home() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('all');
    const [tabValue, setTabValue] = useState('all');
    const [adminData, setAdminData] = useState(null);
    const [emplpyeeData, setEmployeeData] = useState(null);
    const [divisions, setDivisions] = React.useState(null);
    const [divisionData, setDivisionData] = React.useState(null);
    const [districts, setDistricts] = React.useState(null);
    const [districtData, setDistrictData] = React.useState(null);
    const tabHandeler = (val) => {
        if (val === 'all') {
            setTabValue('all');
        }
        if (val === 'admin') {
            setTabValue('admin');
        }
        if (val === 'emp') {
            setTabValue('emp');
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const initial = {
        firstName: '',
        lastName: '',
        employeeType: '',
        districeID: '',
    };

    const fetchData = async () => {
        await axios
            .get('http://59.152.62.177:8085/api/Employee/EmployeeData')
            .then((response) => {
                const adData = response.data.readEmployeeData.filter(
                    (item) => item.employeeType.toLowerCase() === 'admin'
                );
                setAdminData(adData);
                const empData = response.data.readEmployeeData.filter(
                    (item) => item.employeeType.toLowerCase() === 'employee'
                );
                setEmployeeData(empData);
            })
            .catch((err) => err.response);
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
    const [credentials, setCredentials] = React.useState(initial);
    const credentialHandler = (name, value) => {
        if (name === 'divisionId') {
            fetchDistricts(value);
            setCredentials({ ...credentials, [name]: value, districeID: '' });
        } else {
            setCredentials({ ...credentials, [name]: value });
        }
    };
    useEffect(() => {
        if (!adminData || !emplpyeeData) {
            fetchData();
        }
        if ((adminData && !divisions) || (emplpyeeData && !divisions)) {
            fetchDivisions();
        }
        if (divisions) {
            const newData = divisions.map((item) => ({
                label: item.divisionName.toUpperCase(),
                value: item.divID,
            }));
            setDivisionData(newData);
        }
        if ((adminData && !districts) || (emplpyeeData && !districts)) {
            fetchDistricts(adminData.divisionId);
        }
        if (districts) {
            const newData = districts.map((item) => ({
                label: item.districtName.toUpperCase(),
                value: item.districtID,
            }));
            setDistrictData(newData);
        }
    }, [emplpyeeData, adminData, divisions, districts]);
    const tabView = () => {
        if (tabValue === 'all') {
            return <Employees />;
        }
        if (tabValue === 'admin') {
            return (
                <User data={adminData} divisionData={divisionData} districtData={districtData} />
            );
        }
        if (tabValue === 'emp') {
            return <User data={emplpyeeData} />;
        }
        return null;
    };
    const submitHandler = async () => {
        const formData = {
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            employeeType: credentials.employeeType,
            districeID: credentials.districeID,
        };
        await axios
            .post(`http://59.152.62.177:8085/api/Employee/SaveEmployeeInformation`, formData)
            .then((response) => {
                if (response.status === 200) {
                    toast.success(`User Created Successfully`);
                }
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
        handleClose();
    };

    return (
        <Container fluid>
            <Row>
                <Col md={12}>
                    <div
                        className="d-flex justify-content-end p-2 px-3 position-fixed bg-secondary"
                        style={{ width: '99%', height: '3rem', zIndex: '5' }}
                    >
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Add User
                        </Button>
                    </div>
                </Col>
                <Col md={2}>
                    <div
                        className="bg-white rounded p-2 mt-4 position-fixed mt-5"
                        style={{ width: '15%' }}
                    >
                        <Nav
                            activeKey={active}
                            onSelect={setActive}
                            style={{ width: '100%', textAlign: 'left' }}
                            appearance="subtle"
                            reversed
                            vertical
                        >
                            <Nav.Item eventKey="all" onClick={() => tabHandeler('all')}>
                                All User
                            </Nav.Item>
                            <Nav.Item eventKey="admin" onClick={() => tabHandeler('admin')}>
                                Admins
                            </Nav.Item>
                            <Nav.Item eventKey="emp" onClick={() => tabHandeler('emp')}>
                                Employees
                            </Nav.Item>
                        </Nav>
                    </div>
                </Col>
                <Col md={10}>
                    <div className="mt-5 pt-2">{tabView()}</div>
                </Col>
            </Row>
            <Modal open={open} onClose={handleClose}>
                <Modal.Header id="customized-dialog-title" onClose={handleClose}>
                    Add New User
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Form fluid>
                            <Form.Group controlId="firstName">
                                <Form.ControlLabel>First Name</Form.ControlLabel>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    name="firstName"
                                    onChange={(value) => credentialHandler('firstName', value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="lastName">
                                <Form.ControlLabel>Last Name</Form.ControlLabel>
                                <Form.Control
                                    style={{ width: '100%' }}
                                    name="lastName"
                                    onChange={(value) => credentialHandler('lastName', value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="Employee type">
                                <Form.ControlLabel>User Type</Form.ControlLabel>
                                <SelectPicker
                                    data={[
                                        { label: 'Employee', value: 'Employee' },
                                        { label: 'Admin', value: 'Admin' },
                                    ]}
                                    searchable={false}
                                    style={{ width: '100%' }}
                                    onChange={(value) => credentialHandler('employeeType', value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="division">
                                <Form.ControlLabel>Division</Form.ControlLabel>
                                <SelectPicker
                                    data={divisionData || []}
                                    style={{ width: '100%' }}
                                    onChange={(value) => credentialHandler('divisionId', value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="brand">
                                <Form.ControlLabel>District</Form.ControlLabel>
                                <SelectPicker
                                    placeholder="Select district"
                                    data={districtData || []}
                                    style={{ width: '100%' }}
                                    onChange={(value) => credentialHandler('districeID', value)}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={submitHandler}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
