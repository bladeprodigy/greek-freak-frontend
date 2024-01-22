import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid,
    Modal,
    TextField,
    Typography
} from '@mui/material';
import MyReservationsNavbar from "../components/MyReservationsNavbar.tsx";

interface Reservation {
    reservationId: number;
    sittingId: number;
    reservationTime: string;
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
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            console.error('No token found.');
            return;
        }

        const response = await fetch(`https://greek-freak-restaurant.azurewebsites.net/reservations/${reservationId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setSelectedReservation(data);
    };

    const deleteReservation = async (reservationId: string) => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            console.error('No token found.');
            return;
        }

        await fetch(`https://greek-freak-restaurant.azurewebsites.net/reservations/${reservationId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        fetch('https://greek-freak-restaurant.azurewebsites.net/reservations/my-reservations', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setReservations(data));
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
                        <Grid item xs={12} md={6} key={reservation.reservationId}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1">Reservation Time: {new Date(reservation.reservationTime).toLocaleString()}</Typography>
                                    <Typography variant="body1">Number of Guests: {reservation.numberOfGuests}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" color="primary" onClick={() => fetchReservationDetails(reservation.reservationId.toString())}>
                                        View Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1">No reservations found.</Typography>
                )}
                <Modal open={selectedReservation !== null} onClose={() => setSelectedReservation(null)}>
                    <Box sx={{ width: '80%', bgcolor: 'background.paper', p: 2, my: 'auto', mx: 'auto', mt: 10 }}>
                        {selectedReservation && (
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Reservation Details
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Reservation Time: {new Date(selectedReservation.reservationTime).toLocaleString()}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Number of Guests: {selectedReservation.numberOfGuests}
                                    </Typography>
                                    <Button variant="contained" color="secondary" onClick={() => deleteReservation(selectedReservation.reservationId.toString())}>
                                        Delete Reservation
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </Box>
                </Modal>
            </Box>
        </Container>
    );
};

export default MyReservations;