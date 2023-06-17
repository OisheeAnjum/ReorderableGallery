/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-promise-executor-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as React from 'react';
import { toast } from 'react-toastify';
import { Form, Modal, SelectPicker } from 'rsuite';
import Employees from './Employees';
import User from './User';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}
export default function Home() {
    const [load, setLoad] = React.useState(false);
    const [division, setDivision] = React.useState(null);
    const [divisionData, setDivisionData] = React.useState(null);
    const [district, setDistrict] = React.useState(null);
    const [districtData, setDistrictData] = React.useState(null);
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
    const handleChangeDivision = async (value) => {
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
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [tabvalue, setTabValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
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
                    setLoad(true);
                }
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
        console.log(formData);
        handleClose();
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabvalue}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    centered
                >
                    <Tab label="Admins" {...a11yProps(0)} />
                    <Tab label="Employees" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={tabvalue} index={0}>
                <User onClick={handleClickOpen} />
            </TabPanel>
            <TabPanel value={tabvalue} index={1}>
                <Employees onClick={handleClickOpen} />
            </TabPanel>

            <Modal open={open} onClose={handleClose}>
                <Modal.Header id="customized-dialog-title" onClose={handleClose}>
                    Add New User
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Form>
                            <Form.Group controlId="firstName">
                                <Form.ControlLabel>First Name</Form.ControlLabel>
                                <Form.Control
                                    name="firstName"
                                    onChange={(value) => credentialHandler('firstName', value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="lastName">
                                <Form.ControlLabel>Last Name</Form.ControlLabel>
                                <Form.Control
                                    name="lastName"
                                    onChange={(value) => credentialHandler('lastName', value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="division">
                                <Form.ControlLabel>Division</Form.ControlLabel>
                                <SelectPicker
                                    placeholder="Select division"
                                    data={divisionData || []}
                                    style={{ width: '100%' }}
                                    onChange={(value) => handleChangeDivision(value)}
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
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={submitHandler}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </Box>
    );
}
