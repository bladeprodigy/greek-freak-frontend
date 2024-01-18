import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import MainPage from './pages/MainPage';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainPage />
        </ThemeProvider>
    );
};

export default App;