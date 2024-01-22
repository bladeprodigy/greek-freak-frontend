import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import MainPage from './pages/MainPage';
import MyReservations from './pages/MyReservations';
import PrivateRoute from './components/PrivateRoute';
import RegisterAndLogin from './pages/RegisterAndLogin';
import MyAccount from "./pages/MyAccount.tsx";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/my-reservations" element={
                        <PrivateRoute>
                            <MyReservations />
                        </PrivateRoute>
                    } />
                    <Route path="/my-account" element={
                        <PrivateRoute>
                            <MyAccount />
                        </PrivateRoute>
                    } />
                    <Route path="/login" element={<RegisterAndLogin />} />
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;