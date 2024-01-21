import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0D5EAF',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#FFFFFF',
            contrastText: '#0D5EAF',
        },
        background: {
            default: '#F4F4F4',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#0D5EAF',
            secondary: '#1A237E',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            color: '#0D5EAF',
        },
        h2: {
            fontWeight: 700,
            fontSize: '2.2rem',
            color: '#0D5EAF',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    textTransform: 'none',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: `
                html, body {
                    margin: 0;
                    padding: 0;
                    overflow-x: hidden;
                    scroll-behavior: smooth;
                }
            `,
        },
    },
});

export default theme;
