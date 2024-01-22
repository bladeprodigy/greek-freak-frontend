import { Box, Typography } from "@mui/material";

const Home = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'url(/giannis1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 0,
                padding: 0,
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    color: 'secondary',
                    fontFamily: '"GFS Neohellenic", serif',
                    fontWeight: 'bold',
                    textShadow: '3px 3px 10px rgba(0, 0, 0, 0.8)',
                    fontSize: '4rem',
                    '@media (max-width:600px)': {
                        fontSize: '2rem',
                    },
                    WebkitTextStroke: '1px black',
                }}
            >
                Greek Freak
            </Typography>
        </Box>
    );
};

export default Home;
