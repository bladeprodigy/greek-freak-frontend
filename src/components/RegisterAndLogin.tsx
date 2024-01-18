import React, { ChangeEvent, useState } from 'react';
import {Box, Tab, Tabs, TextField, Button, Container, Grid, Paper} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

interface FormField {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    confirmPassword?: string;
}

const RegisterAndLogin = (): React.ReactElement => {
    const [value, setValue] = useState('1');
    const [loginFields, setLoginFields] = useState<FormField>({ email: '', password: '' });
    const [registerFields, setRegisterFields] = useState<FormField>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const handleTabChange = (_: ChangeEvent<unknown>, newValue: string): void => {
        setValue(newValue);
    };

    const handleLoginChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLoginFields({ ...loginFields, [event.target.name]: event.target.value });
    };

    const handleRegisterChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setRegisterFields({ ...registerFields, [event.target.name]: event.target.value });
    };

    const handleLoginSubmit = (): void => {
        console.log('Login Info:', loginFields);
        // Implement your login logic here
    };

    const handleRegisterSubmit = (): void => {
        console.log('Register Info:', registerFields);
        // Implement your registration logic here
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: 'center', display: 'flex' }}>
                        <Tabs value={value} onChange={handleTabChange} aria-label="login register tabs" centered>
                            <Tab label="Login" value="1" />
                            <Tab label="Register" value="2" />
                        </Tabs>
                </Box>
                    <TabPanel value="1" sx={{ pt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                value={loginFields.email}
                                onChange={handleLoginChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                name="password"
                                type="password"
                                value={loginFields.password}
                                onChange={handleLoginChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleLoginSubmit}>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </TabPanel>
                    <TabPanel value="2" sx={{ pt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                name="firstName"
                                value={registerFields.firstName}
                                onChange={handleRegisterChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                name="lastName"
                                value={registerFields.lastName}
                                onChange={handleRegisterChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                value={registerFields.email}
                                onChange={handleRegisterChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                name="phoneNumber"
                                value={registerFields.phoneNumber}
                                onChange={handleRegisterChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                name="password"
                                type="password"
                                value={registerFields.password}
                                onChange={handleRegisterChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Confirm Password"
                                variant="outlined"
                                fullWidth
                                name="confirmPassword"
                                type="password"
                                value={registerFields.confirmPassword}
                                onChange={handleRegisterChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleRegisterSubmit}>
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </TabPanel>
            </TabContext>
            </Paper>
        </Container>
    );
};

export default RegisterAndLogin;
