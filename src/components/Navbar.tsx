import {AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <AppBar position="fixed" sx={{ width: '100%', background: theme.palette.primary.main }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, fontFamily: '"GFS Neohellenic", serif', }}>
                        Greek Freak
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button color="inherit" href="#home">Home</Button>
                        <Button color="inherit" href="#about">About Us</Button>
                        <Button color="inherit" href="#menu">Menu</Button>
                        <Button color="inherit" href="/login">Login/Register</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {/* Drawer items */}
                <Button color="inherit" href="#home">Home</Button>
                <Button color="inherit" href="#about">About Us</Button>
                <Button color="inherit" href="#menu">Menu</Button>
                <Button color="inherit" href="#login">Login/Register</Button>
            </Drawer>
        </>
    );
};

export default Navbar;
