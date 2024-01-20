import { Box, Typography } from "@mui/material";

const Home = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'url(/giannis1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                height: '100vh',
                width: '100vw', // Use '100vw' for full viewport width
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 0, // Remove margin
                padding: 0, // Remove padding
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    color: 'secondary',
                    fontFamily: '"GFS Neohellenic", serif',
                    fontWeight: 'bold', // Makes the font bolder
                    textShadow: '3px 3px 10px rgba(0, 0, 0, 0.8)', // More pronounced text shadow
                    fontSize: '4rem', // Larger font size for desktop
                    '@media (max-width:600px)': {
                        fontSize: '2rem', // Smaller font size for mobile devices
                    },
                    WebkitTextStroke: '1px black', // Outline effect for better readability
                }}
            >
                Greek Freak
            </Typography>
        </Box>
    );
};

export default Home;
