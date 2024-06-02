import React, { useState } from 'react';
// @ts-ignore
import logo from '../assets/images/logo.png';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthService } from "../services/auth";
import { useNavigate } from 'react-router-dom';
import { ActiveUser } from "../services/user";
import Alert from '../components/alert/Alert';

const theme = createTheme();

const LoginPage: React.FC = () => {
    ActiveUser.clean();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [open, setOpen] = useState(false);  // State for dialog
    const [resetEmail, setResetEmail] = useState('');  // State for reset email
    const [emailError, setEmailError] = useState<string | null>(null); // State for email format error
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (!regMail.test(email)) {
            setAlertMessage("Email is not correct");
            return;
        }

        const body = {
            email: email,
            password: password
        };

        try {
            await AuthService.login(body);
            navigate('/');
            window.location.reload();
        } catch (error) {
            // @ts-ignore
            setAlertMessage("Login failed: " + error.message);
        }
    };

    const handleCloseAlert = () => {
        setAlertMessage(null);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setResetEmail(''); // Clear reset email field
        setEmailError(null); // Clear email error message
    };

    const handleSendReset = async () => {
        let regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (!regMail.test(resetEmail)) {
            setEmailError("Invalid email format");
            return;
        }

        // Logic for sending reset email
        try {
            await AuthService.resetPassword({ email: resetEmail });
            setAlertMessage("Reset link sent to your email.");
            handleClose();
        } catch (error) {
            // @ts-ignore
            setAlertMessage("Failed to send reset link: " + error.message);
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
                                <Link href="#" variant="body2" onClick={handleClickOpen}>
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
                {alertMessage && <Alert message={alertMessage} onClose={handleCloseAlert} />}

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To reset your password, please enter your email address here.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="resetEmail"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={resetEmail}
                            onChange={(e) => {
                                setResetEmail(e.target.value);
                                setEmailError(null); // Clear email error on change
                            }}
                            error={!!emailError} // Show error state
                            helperText={emailError} // Display error message
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSendReset}>Send</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
};

export default LoginPage;
