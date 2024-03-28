// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import logo from '../assets/images/logo.png';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const RegistrationPage: React.FC = () => {

    useState()

    const [email, setEmail] = useState('');
    const [nickname, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    let regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let regNickname = /^[a-zA-Z0-9_]{3,20}$/;

    const handleSignUp = () => {

        if (!regNickname.test(nickname)){
            alert("Nickname is not correct")
            return 0
        }

        if (!regMail.test(email)) {
            alert("Email is not correct");
            return 0
        }

        if(password.length < 8) {
            alert("Password should contain more than 8 characters")
            return 0
        }

        if(confirmPassword != password){
            alert("Passwords are not the same")
            return 0
        }

        console.log('Nickname:', nickname)
        console.log('Email:', email);
        console.log('Password:', password);






    };

// const theme = createTheme();
//
// const RegistrationPage = () => {

  // @ts-ignore
    // @ts-ignore
    // @ts-ignore
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
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
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
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={confirmPassword}
              // // @ts-ignore
              // onChangeText={setPassword()}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              label="Confirm Password"
              type="confirmPassword"
              id="confirmPassword"
            />

            <Button
                type="button" // Change from submit to button to avoid form submission
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSignUp} // Added onClick event handler
            >
                Sign Up
            </Button>
            <Grid container>
              <Grid item xs className="text-right">
                <Link href="/signin" variant="body2">
                  {"Already have an account?"}
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