/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function UserDetails({ id }) {
    const [divisions, setDivisions] = useState(null);
    const [districts, setDistricts] = useState(null);
    const [userData, setUserData] = useState(null);
    const [credentials, setCredentials] = useState({
        first_name: '',
        last_name: '',
        district: '',
        division: '',
    });
    const fetchUser = async (userId) => {
        const res = await axios
            .get(`http://59.152.62.177:8085/api/Employee/IndividualEmployeeData/${userId}`)
            .then((response) => response)
            .catch((err) => err.response);
        if (res.status === 200) {
            setUserData(res.data.readEmployeeData);
            setCredentials();
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

    useEffect(() => {
        if (id && !userData) {
            fetchUser(id);
        }
        if (userData && !divisions) {
            fetchDivisions();
        }
        if (userData && !districts) {
            fetchDistricts(userData[0].divisionId);
        }
    }, [id, userData, divisions, districts]);
    console.log(districts);
    return <div>UserDetails</div>;
}
