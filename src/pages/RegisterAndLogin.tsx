import React, { ChangeEvent, useState } from 'react';
import { Box, Tab, Tabs, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

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
    const [registerErrors, setRegisterErrors] = useState<Record<string, string[]>>({});
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();

    const handleTabChange = (_: ChangeEvent<unknown>, newValue: string): void => {
        setValue(newValue);
        setRegisterErrors({});
        setLoginError('');
    };

    const handleLoginChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLoginFields({ ...loginFields, [event.target.name]: event.target.value });
        setLoginError('');
    };

    const handleRegisterChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setRegisterFields({ ...registerFields, [event.target.name]: event.target.value });
        setRegisterErrors({});
    };

    const handleLoginSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        const { email, password } = loginFields;

        if (!email || !password) {
            setLoginError('Email and password are required.');
            return;
        }

        try {
            const response = await fetch('https://greek-freak-restaurant.azurewebsites.net/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                new Error(errorText || response.statusText);
            }

            const data = await response.json();
            localStorage.setItem('jwtToken', data.token);
            navigate('/my-reservations');
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('An error occurred while trying to log in.');
        }
    };

    const handleRegisterSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        const { firstName, lastName, email, phoneNumber, password, confirmPassword } = registerFields;

        if (password !== confirmPassword) {
            setRegisterErrors({ confirmPassword: ["Passwords do not match"] });
            return;
        }

        if (!firstName || !lastName || !email || !phoneNumber || !password) {
            setRegisterErrors({ general: ["All fields are required."] });
            return;
        }

        try {
            const response = await fetch('https://greek-freak-restaurant.azurewebsites.net/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, phoneNumber, password, confirmPassword }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                new Error(errorText || response.statusText);
            }

            const data = await response.json();
            console.log('Registration successful:', data);
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            setRegisterErrors({ general: ["An error occurred during registration."] });
        }
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
                            {loginError && (
                                <Grid item xs={12}>
                                    <Box color="error.main">{loginError}</Box>
                                </Grid>
                            )}
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
                                {registerErrors.firstName?.map((error, index) => (
                                    <Box key={index} color="error.main">{error}</Box>
                                ))}
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
                                {registerErrors.lastName?.map((error, index) => (
                                    <Box key={index} color="error.main">{error}</Box>
                                ))}
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
                                {registerErrors.Email?.map((error, index) => (
                                    <Box key={index} color="error.main">{error}</Box>
                                ))}
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
                                {registerErrors.PhoneNumber?.map((error, index) => (
                                    <Box key={index} color="error.main">{error}</Box>
                                ))}
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
                                {registerErrors.Password?.map((error, index) => (
                                    <Box key={index} color="error.main">{error}</Box>
                                ))}
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
                                {registerErrors.ConfirmPassword?.map((error, index) => (
                                    <Box key={index} color="error.main">{error}</Box>
                                ))}
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" fullWidth onClick={handleRegisterSubmit}>
                                    Register
                                </Button>
                            </Grid>
                            {registerErrors.general?.map((error, index) => (
                                <Grid item xs={12} key={`general-${index}`}>
                                    <Box color="error.main">{error}</Box>
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>
                </TabContext>
            </Paper>
        </Container>
    );
};

export default RegisterAndLogin;
