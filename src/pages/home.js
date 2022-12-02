import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Logo } from '../images/Login.svg';
import { username, user } from '../user'

const theme = createTheme({
    palette: {
        background: {
            // default: "#ADD8E6",
        },
        primary: {
            main: '#1056AF',
        },
        secondary: {
            main: '#000000',
        },
    },
});

export default function Home(){
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        user.leave();
        username.set('');
        navigate('/');
    }
    const name = user.get('alias')._.put
    
    return(
        <>
            <p>Hello {name}</p>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={handleLogout}
                                sx={{ mt: 3, mb: 2, borderRadius: 3, bgcolor: 'primary.main' }}
                            >
                                Log Out
                            </Button>
                            
                </Container>
            </ThemeProvider>
        </>
    )
    
    
}