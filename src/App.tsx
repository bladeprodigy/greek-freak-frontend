import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import MainPage from './pages/MainPage';
import MyReservations from './pages/MyReservations';
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/my-reservations" element={<MyReservations />} />
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;