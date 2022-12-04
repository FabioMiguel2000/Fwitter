import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactComponent as Logo } from '../images/Login.svg';
import { user } from '../gun/user'
import { useNavigate } from 'react-router-dom';


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

export default function CreateAccount() {
    const navigate = useNavigate();

    const handleCreate = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user_ = data.get('user');
        const pass_ = data.get('password');  
        /*console.log({
            user: data.get('user'),
            password: data.get('password'),
        });*/

        
        user.create(user_, pass_, ({ err }) => {
            if(err){
                alert(err)
            }
            else{
                navigate('/');
            }
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <Logo height="300px" width="300px" />
                    </div>
                    <Box component="form" onSubmit={handleCreate} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="user"
                            label="User Name"
                            name="user"
                            autoComplete="user"
                            autoFocus
                            sx={{ input: { color: 'primary.main' } }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            sx={{ input: { color: 'primary.main' } }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, borderRadius: 3, bgcolor: 'primary.main' }}
                        >
                            Create Account
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}