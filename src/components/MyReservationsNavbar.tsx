import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MyReservationsNavbar = () => {
    const navigate = useNavigate();

    const handleMyAccountClick = () => {
        navigate('/my-account');
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('jwtToken');
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My Reservations
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button color="inherit" onClick={handleMyAccountClick}>
                        My Account
                    </Button>
                    <Button color="inherit" onClick={handleLogoutClick}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MyReservationsNavbar;