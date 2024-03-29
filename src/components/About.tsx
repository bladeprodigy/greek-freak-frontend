import { Box, Container, Grid, Typography } from "@mui/material";

const About = () => {
    return (
        <Box sx={{
            bgcolor: 'white',
            py: 4,
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold',fontFamily: '"GFS Neohellenic", serif', color: '#0D5EAF' }}>
                            About Us
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#555', fontFamily: '"GFS Neohellenic", serif', }}>
                            Restaurant owners, Giannis - the best basketball player, Aleks - the best football player and Michał - the best CS2 player
                            teamed up to create a series of restaurants across the world. This is the first one, located in the heart of Milwaukee, Wisconsin.
                            We serve the best Greek food in the country. We gathered the best chefs from Greece to make sure that you get the best experience possible.
                            The restaurant is regularly visited by Giannis, Aleks and Michał, so you can meet them in person,
                            but be prepared to get mogged by them. We hope you will enjoy your stay. See you soon!
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src="/greekgrill.jpg"
                            alt="Delicious Greek Dish"
                            sx={{
                                maxWidth: '100%',
                                height: 'auto',
                                borderRadius: 2,
                                boxShadow: 3,
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default About;