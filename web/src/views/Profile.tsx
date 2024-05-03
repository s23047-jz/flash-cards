import React from 'react';
import { Avatar, Button, Stack, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// @ts-ignore
import avatar from '../assets/Profile.png';
import '../styles/profile/user_profile_styles.scss';
import {ActiveUser} from "../services/user";
import DrawerAppBar from "../components/home_page/NavBar";
import DecksContainer from "../components/my_deck_page/DecksContainer";

const theme = createTheme();

const UserProfilePage: React.FC = () => {

    return (
        <ThemeProvider theme={theme}>
            <DrawerAppBar />
            <Container component="main" className="user-profile-page">
                <Stack
                    direction={{ xs: 'column', sm: 'row' }} // Responsive direction change
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ height: '100%', width: '100%' }}
                >
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width: '100%', flex: 1 }} // Ensure equal flex distribution
                    >
                        <Avatar src={avatar} sx={{ width: '50%', height: 'auto' }} />
                    </Stack>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width: '100%', flex: 1 }}
                    >
                        <div style={{ width: '100%', maxWidth: '480px' }}>
                            <Button variant="contained" fullWidth className="user-stats-button" sx={{ marginBottom: '24px', padding: '20px 0' }}>User Stats</Button>
                            <Button variant="contained" fullWidth className="change-nickname-button" sx={{ marginBottom: '24px', padding: '20px 0' }}>Change Nickname</Button>
                            <Button variant="contained" fullWidth className="change-email-button" sx={{ marginBottom: '24px', padding: '20px 0' }}>Change Email</Button>
                            <Button variant="contained" fullWidth className="change-password-button" sx={{ marginBottom: '24px', padding: '20px 0' }}>Change Password</Button>
                            <Button variant="contained" fullWidth className="delete-account-button" sx={{ padding: '20px 0' }}>Delete Account</Button>
                        </div>
                    </Stack>
                </Stack>
            </Container>
        </ThemeProvider>
    );
};

export default UserProfilePage;
