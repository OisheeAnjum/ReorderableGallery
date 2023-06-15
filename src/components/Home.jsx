/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-promise-executor-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import CloseIcon from '@mui/icons-material/Close';
import { MenuItem, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import * as React from 'react';
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
    const [division, setDivision] = React.useState(null);
    const [selectedDivision, setSelectedDivision] = React.useState(null);
    const [selectedDistrict, setSelectedDistrict] = React.useState(null);
    const [district, setDistrict] = React.useState(null);
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
    const formData = {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        employeeType: credentials.employeeType,
        districeID: credentials.districeID,
    };
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
    React.useEffect(() => {
        fetch();
    }, []);

    const handleChangeDivision = async (event) => {
        setSelectedDivision(event.target.value);
        setSelectedDistrict(null);
        await axios
            .get(`http://59.152.62.177:8085/api/Employee/District/${selectedDivision}`)
            .then((response) => {
                setDistrict(response.data.readDistrictData);
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
    };

    const handleChangeDistrict = (event) => {
        setSelectedDistrict(event.target.value);
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
    BootstrapDialogTitle.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabvalue}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    centered
                >
                    <Tab label="Users" {...a11yProps(0)} />
                    <Tab label="Employees" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={tabvalue} index={0}>
                <User onClick={handleClickOpen} />
            </TabPanel>
            <TabPanel value={tabvalue} index={1}>
                <Employees onClick={handleClickOpen} />
            </TabPanel>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add New User
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography style={{ minWidth: '20rem' }} gutterBottom>
                        <div>
                            <Formik initial>
                                <Form>
                                    <div className="d-flex flex-column">
                                        <TextField
                                            id="firstName"
                                            label="First Name"
                                            variant="standard"
                                            onChange={(value) =>
                                                credentialHandler('firstName', value)
                                            }
                                        />
                                        <TextField
                                            id="lastName"
                                            label="Last Name"
                                            variant="standard"
                                        />
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectedDivision}
                                                label="Age"
                                                onChange={handleChangeDivision}
                                            >
                                                {division &&
                                                    division.map((item) => (
                                                        <MenuItem
                                                            value={item.divID}
                                                            key={item.divID}
                                                        >
                                                            {item.divisionName}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectedDistrict}
                                                label="District"
                                                onChange={handleChangeDistrict}
                                            >
                                                {district &&
                                                    district.map((item) => (
                                                        <MenuItem
                                                            value={item.districtID}
                                                            key={item.districtID}
                                                        >
                                                            {item.districtName}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Box>
    );
}
