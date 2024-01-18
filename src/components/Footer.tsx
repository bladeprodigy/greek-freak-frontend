import React from 'react';
import {Box, Container, Grid, Typography} from '@mui/material';

const Footer = (): React.ReactElement => {
    return (
        <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'white', py: 2 }}>
            <Container maxWidth="lg">
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body2" align="center" gutterBottom>
                            &copy; {new Date().getFullYear()} Greek Freak Restaurant
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body2" align="center">
                            All rights reserved.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="body2" align="center">
                            Developed by Aleks and Michał
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;