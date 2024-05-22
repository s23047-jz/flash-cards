// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import logo from '../assets/images/logo.png';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthService } from "../services/auth";
import { useNavigate } from 'react-router-dom';
import { ActiveUser } from "../services/user";

const theme = createTheme();

const LoginPage: React.FC = () => {
    ActiveUser.clean()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Email validation
        let regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (!regMail.test(email)) {
            alert("Email is not correct");
            return;
        }

        // Prepare the payload
        const body = {
            email: email,
            password: password
        };

        // Attempt to log in
        try {
            await AuthService.login(body);
            // Navigate to the dashboard or home page upon success
            // e.g., navigation.navigate("Dashboard");
            navigate('/');
            window.location.reload();
        } catch (error) {
            // @ts-ignore
            // Handle login error (e.g., show error message)
            alert("Login failed: " + error.message);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper
                    elevation={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 3,
                        borderRadius: '30px',
                    }}
                >
                    <Avatar sx={{ m: 1, width: 200, height: 200 }} src={logo} />
                    <Typography component="h1" variant="h4">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/registration" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default LoginPage;