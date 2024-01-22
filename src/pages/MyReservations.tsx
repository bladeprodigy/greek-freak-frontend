import React, { useEffect, useState } from 'react';
import {Box, Button, Card, CardContent, Container, Grid, Modal, TextField, Typography} from '@mui/material';
import MyReservationsNavbar from "../components/MyReservationsNavbar.tsx";

interface Reservation {
    id: string;
    date: string;
    time: string;
    numberOfGuests: number;
}

interface Sitting {
    sittingId: number;
    capacity: number;
    isOutside: boolean;
}

const MyReservations = (): React.ReactElement => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [availableSittings, setAvailableSittings] = useState<Sitting[]>([]);
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
    const [reservationTime, setReservationTime] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            console.error('No token found.');
            return;
        }

        fetch('https://greek-freak-restaurant.azurewebsites.net/reservations/my-reservations', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch reservations.');
                }
                return response.json();
            })
            .then(data => setReservations(data))
            .catch(error => console.error('Fetch error:', error));
    }, []);

    const fetchAvailableSittings = async (reservationTime: string, numberOfGuests: number) => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            console.error('No token found.');
            return;
        }

        const response = await fetch('https://greek-freak-restaurant.azurewebsites.net/sittings/available', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ reservationTime, numberOfGuests }),
        });

        const data = await response.json();
        setAvailableSittings(data);
    };

    const createReservation = async (reservationTime: string, numberOfGuests: number, selectedSittingId: number) => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            console.error('No token found.');
            return;
        }

        await fetch('https://greek-freak-restaurant.azurewebsites.net/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ selectedSittingId, reservationTime, numberOfGuests }),
        });

        fetch('https://greek-freak-restaurant.azurewebsites.net/reservations/my-reservations', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setReservations(data));
    };

    const fetchReservationDetails = async (reservationId: string) => {
        const response = await fetch(`https://greek-freak-restaurant.azurewebsites.net/reservations/${reservationId}`);
        const data = await response.json();
        setSelectedReservation(data);
    };

    const deleteReservation = async (reservationId: string) => {
        await fetch(`https://greek-freak-restaurant.azurewebsites.net/reservations/${reservationId}`, {
            method: 'DELETE',
        });

        fetch('https://greek-freak-restaurant.azurewebsites.net/reservations/my-reservations')
            .then(response => response.json())
            .then(data => setReservations(data));

        setSelectedReservation(null);
    };

    return (
        <Container maxWidth="md">
            <MyReservationsNavbar />
            <Box mt={4}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Reservation Time"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        value={reservationTime}
                        onChange={e => setReservationTime(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Number of Guests"
                        type="number"
                        fullWidth
                        value={numberOfGuests}
                        onChange={e => setNumberOfGuests(parseInt(e.target.value))}
                    />
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => fetchAvailableSittings(reservationTime, numberOfGuests)}>
                Create Reservation
            </Button>
            <Grid container spacing={2}>
                {availableSittings.map((sitting) => (
                    <Grid item xs={12} md={6} key={sitting.sittingId}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Available Sitting</Typography>
                                <Typography variant="body1">{`Capacity: ${sitting.capacity}`}</Typography>
                                <Typography variant="body1">{`Is Outside: ${sitting.isOutside ? 'Yes' : 'No'}`}</Typography>
                                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => createReservation(reservationTime, numberOfGuests, sitting.sittingId)}>
                                    Select Sitting
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {reservations.length > 0 ? (
                reservations.map((reservation) => (
                    <Box key={reservation.id} sx={{ mb: 2 }}>
                        <Button onClick={() => fetchReservationDetails(reservation.id)}>
                            <Typography variant="h6">{`Reservation Date: ${reservation.date}`}</Typography>
                            <Typography variant="body1">{`Reservation Time: ${reservation.time}`}</Typography>
                            <Typography variant="body1">{`Number of Guests: ${reservation.numberOfGuests}`}</Typography>
                        </Button>
                    </Box>
                ))
            ) : (
                <Typography variant="body1">No reservations found.</Typography>
            )}
            <Modal open={selectedReservation !== null} onClose={() => setSelectedReservation(null)}>
                <Box sx={{ p: 4, bgcolor: 'white' }}>
                    {selectedReservation && (
                        <>
                            <Typography variant="h6">{`Reservation Date: ${selectedReservation.date}`}</Typography>
                            <Typography variant="body1">{`Reservation Time: ${selectedReservation.time}`}</Typography>
                            <Typography variant="body1">{`Number of Guests: ${selectedReservation.numberOfGuests}`}</Typography>
                            <Button variant="contained" color="secondary" onClick={() => deleteReservation(selectedReservation.id)}>
                                Delete Reservation
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
            </Box>
        </Container>
    );
};

export default MyReservations;