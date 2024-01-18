import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0D5EAF', // Niebieski kolor przypominający barwy flagi Grecji
            contrastText: '#FFFFFF', // Biały tekst na niebieskim tle
        },
        secondary: {
            main: '#FFFFFF', // Biały kolor dla kontrastujących elementów
            contrastText: '#0D5EAF', // Niebieski tekst na białym tle
        },
        background: {
            default: '#F4F4F4', // Jasne tło, które będzie dobrze komponować się z resztą palety
            paper: '#FFFFFF', // Tło dla elementów wyglądających jak "papier"
        },
        text: {
            primary: '#0D5EAF', // Główny kolor tekstu
            secondary: '#1A237E', // Dodatkowy kolor tekstu
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700, // pogrubienie dla nagłówków
            fontSize: '2.5rem',
            color: '#0D5EAF', // Niebieski kolor tekstu
        },
        h2: {
            fontWeight: 700,
            fontSize: '2.2rem',
            color: '#0D5EAF',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', // Lekki cień dla poprawy czytelności
        },
        // i tak dalej dla innych elementów typografii
    },
    // Można tutaj dodać własne komponenty i ich style
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4, // delikatnie zaokrąglone rogi przycisków
                    textTransform: 'none', // brak automatycznego kapitalizowania tekstu
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: `
                html, body {
                    margin: 0;
                    padding: 0;
                    overflow-x: hidden;
                }
            `,
        },
        // Tutaj możesz dostosować inne komponenty
    },
    // Można również dodać własne klasy pomocnicze, jeśli jest taka potrzeba
});

export default theme;
