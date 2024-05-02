import React, { useState } from 'react';
import { Avatar, Button, Stack, Typography, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import avatar from '../assets/Profile.png';
import '../styles/profile/user_profile_styles.scss';
import {AuthService} from "../services/auth";

const theme = createTheme();

const UserProfilePage: React.FC = () => {
    const [openNickname, setOpenNickname] = useState(false);
    const [nickname, setNickname] = useState("");
    const [openEmail, setOpenEmail] = useState(false);
    const [email, setEmail] = useState("");
    const [openPassword, setOpenPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleOpen = (modalType: 'nickname' | 'email' | 'password') => {
        if (modalType === 'nickname') setOpenNickname(true);
        else if (modalType === 'email') setOpenEmail(true);
        else if (modalType === 'password') setOpenPassword(true);
    };

    const handleClose = (modalType: 'nickname' | 'email' | 'password') => {
        if (modalType === 'nickname') setOpenNickname(false);
        else if (modalType === 'email') setOpenEmail(false);
        else if (modalType === 'password') setOpenPassword(false);
    };

// const handleSave = async (modalType: 'nickname' | 'email' | 'password') => {
//     try {
//         if (modalType === 'nickname') {
//             await AuthService.updateNickname(nickname);
//             console.log("Nickname updated successfully.");
//             handleClose('nickname');
//         } else if (modalType === 'email') {
//             await AuthService.updateEmail(email);
//             console.log("Email updated successfully.");
//             handleClose('email');
//         } else if (modalType === 'password') {
//             if (newPassword !== confirmPassword) {
//                 alert("Passwords do not match.");
//                 return;
//             }
//             await AuthService.updatePassword({ currentPassword, newPassword });
//             console.log("Password changed successfully.");
//             handleClose('password');
//         }
//     } catch (error) {
//         console.error("Update failed: ", error);
//         // @ts-ignore
//         alert("Failed to update: " + error.message);
//     }
// };


    const handleChange = (value: string, type: 'nickname' | 'email' | 'currentPassword' | 'newPassword' | 'confirmPassword') => {
        if (type === 'nickname') setNickname(value);
        else if (type === 'email') setEmail(value);
        else if (type === 'currentPassword') setCurrentPassword(value);
        else if (type === 'newPassword') setNewPassword(value);
        else if (type === 'confirmPassword') setConfirmPassword(value);
    };

    return (
        <ThemeProvider theme={theme}>
            <DrawerAppBar />
            <Container component="main" className="user-profile-page">
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ height: '100%', width: '100%' }}
                >
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width: '100%', flex: 1 }}
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
                            <Button variant="contained" fullWidth className="change-nickname-button" sx={{ marginBottom: '24px', padding: '20px 0' }} onClick={() => handleOpen('nickname')}>Change Nickname</Button>
                            <Button variant="contained" fullWidth className="change-email-button" sx={{ marginBottom: '24px', padding: '20px 0' }} onClick={() => handleOpen('email')}>Change Email</Button>
                            <Button variant="contained" fullWidth className="change-password-button" sx={{ marginBottom: '24px', padding: '20px 0' }} onClick={() => handleOpen('password')}>Change Password</Button>
                            <Button variant="contained" fullWidth className="delete-account-button" sx={{ padding: '20px 0' }}>Delete Account</Button>
                        </div>
                    </Stack>
                </Stack>
                <Dialog open={openNickname} onClose={() => handleClose('nickname')}>
                    <DialogTitle>Change Nickname</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="nickname" label="New Nickname" type="text" fullWidth variant="standard" value={nickname} onChange={(e) => handleChange(e.target.value, 'nickname')} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose('nickname')}>Cancel</Button>
                        {/*<Button onClick={() => handleSave('nickname')}>Save</Button>*/}
                    </DialogActions>
                </Dialog>
                <Dialog open={openEmail} onClose={() => handleClose('email')}>
                    <DialogTitle>Change Email</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="email" label="New Email" type="email" fullWidth variant="standard" value={email} onChange={(e) => handleChange(e.target.value, 'email')} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose('email')}>Cancel</Button>
                        {/*<Button onClick={() => handleSave('email')}>Save</Button>*/}
                    </DialogActions>
                </Dialog>
                <Dialog open={openPassword} onClose={() => handleClose('password')}>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="currentPassword" label="Current Password" type="password" fullWidth variant="standard" value={currentPassword} onChange={(e) => handleChange(e.target.value, 'currentPassword')} />
                        <TextField margin="dense" id="newPassword" label="New Password" type="password" fullWidth variant="standard" value={newPassword} onChange={(e) => handleChange(e.target.value, 'newPassword')} />
                        <TextField margin="dense" id="confirmPassword" label="Confirm New Password" type="password" fullWidth variant="standard" value={confirmPassword} onChange={(e) => handleChange(e.target.value, 'confirmPassword')} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose('password')}>Cancel</Button>
                        {/*<Button onClick={() => handleSave('password')}>Save</Button>*/}
                    </DialogActions>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
};

export default UserProfilePage;
