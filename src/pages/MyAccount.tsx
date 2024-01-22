import React, {useEffect, useState} from 'react';
import {Button, Container, TextField, Typography} from '@mui/material';

interface AccountFields {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

const MyAccount = (): React.ReactElement => {
    const [accountFields, setAccountFields] = useState<AccountFields>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            console.error('No token found.');
            return;
        }

        fetch('https://greek-freak-restaurant.azurewebsites.net/my-account', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setAccountFields(data));
    }, []);

    const handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccountFields({ ...accountFields, [event.target.name]: event.target.value });
    };

    const updateAccount = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            console.error('No token found.');
            return;
        }

        await fetch('https://greek-freak-restaurant.azurewebsites.net/my-account/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(accountFields),
        });

        // Fetch account details again to update the form
        fetch('https://greek-freak-restaurant.azurewebsites.net/my-account', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setAccountFields(data));
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>My Account</Typography>
            <TextField label="First Name" variant="outlined" fullWidth name="firstName" value={accountFields.firstName} onChange={handleAccountChange} sx={{ mb: 2 }} />
            <TextField label="Last Name" variant="outlined" fullWidth name="lastName" value={accountFields.lastName} onChange={handleAccountChange} sx={{ mb: 2 }} />
            <TextField label="Email" variant="outlined" fullWidth name="email" value={accountFields.email} onChange={handleAccountChange} sx={{ mb: 2 }} />
            <TextField label="Phone Number" variant="outlined" fullWidth name="phoneNumber" value={accountFields.phoneNumber} onChange={handleAccountChange} sx={{ mb: 2 }} />
            <Button variant="contained" color="primary" onClick={updateAccount}>Update Account</Button>
        </Container>
    );
};

export default MyAccount;