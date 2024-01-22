import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

interface Reservation {
    id: string;
    date: string;
    time: string;
    numberOfGuests: number;
}

const MyReservations = (): React.ReactElement => {
    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        fetch('https://greek-freak-restaurant.azurewebsites.net/reservations/my-reservations')
            .then(response => response.json())
            .then(data => setReservations(data));
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                Create Reservation
            </Button>
            {reservations.map((reservation) => (
                <Box key={reservation.id} sx={{ mb: 2 }}>
                    <Typography variant="h6">{`Reservation Date: ${reservation.date}`}</Typography>
                    <Typography variant="body1">{`Reservation Time: ${reservation.time}`}</Typography>
                    <Typography variant="body1">{`Number of Guests: ${reservation.numberOfGuests}`}</Typography>
                </Box>
            ))}
        </Container>
    );
};

export default MyReservations;