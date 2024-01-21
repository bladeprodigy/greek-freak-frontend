import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import MainPage from './pages/MainPage';
import {BrowserRouter} from "react-router-dom";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <MainPage />
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;