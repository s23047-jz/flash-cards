import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography, Container, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AuthService } from '../services/auth';
import Alert from '../components/alert/Alert'; // Importujemy komponent Alert
// @ts-ignore
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const RegistrationPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [nickname, setNickName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [nicknameError, setNicknameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Stan dla komunikatu o pomyślnym utworzeniu konta

    const navigate = useNavigate();

    const handleSignUp = async () => {
        let isValid = true;
        setEmailError('');
        setNicknameError('');
        setPasswordError('');
        setConfirmPasswordError('');

        if (!/^[a-zA-Z0-9_]{3,20}$/.test(nickname)) {
            setNicknameError("Nickname must be 3-20 characters long and contain only letters, numbers, or underscores.");
            isValid = false;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)) {
            setEmailError("Invalid email format.");
            isValid = false;
        }

        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            isValid = false;
        }

        if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords do not match.");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        try {
            await AuthService.register({ email, password, re_password: confirmPassword, username: nickname });
            setSuccessMessage("Account created successfully!"); // Ustawiamy komunikat o pomyślnym utworzeniu konta
        } catch (error: any) {
            if (error.response?.status === 400) {
                if (error.response.data?.email) {
                    setEmailError("Email already taken");
                } else if (error.response.data?.username) {
                    setNicknameError("Nickname already taken");
                } else {
                    setEmailError("Registration failed, probably email already taken");
                }
            } else {
                alert("Registration failed: " + error.message);
            }
        }
    };

    const handleCloseAlert = () => {
        setSuccessMessage(null);
        navigate('/signin'); // Przechodzimy do strony logowania po zamknięciu alertu
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {successMessage && <Alert message={successMessage} onClose={handleCloseAlert} />} {/* Wyświetlamy alert */}
                <Paper elevation={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, borderRadius: '30px' }}>
                    <Avatar sx={{ m: 1, width: 200, height: 200 }} src={logo} />
                    <Typography component="h1" variant="h4">
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            error={!!nicknameError}
                            helperText={nicknameError}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={nickname}
                            onChange={(e) => setNickName(e.target.value)}
                            id="nickname"
                            label="Nickname"
                            name="nickname"
                            autoComplete="nickname"
                            autoFocus
                        />
                        <TextField
                            error={!!emailError}
                            helperText={emailError}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            error={!!passwordError}
                            helperText={passwordError}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <TextField
                            error={!!confirmPasswordError}
                            helperText={confirmPasswordError}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs className="text-right">
                                <Link href="/signin" variant="body2">
                                    {"Already have an account? Sign in here"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default RegistrationPage;