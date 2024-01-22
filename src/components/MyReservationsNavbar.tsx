import { Button, Box } from '@mui/material';
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
            <Button variant="contained" color="primary" onClick={handleMyAccountClick}>
                My Account
            </Button>
            <Button variant="contained" color="secondary" onClick={handleLogoutClick} sx={{ ml: 2 }}>
                Logout
            </Button>
        </Box>
    );
};

export default MyReservationsNavbar;