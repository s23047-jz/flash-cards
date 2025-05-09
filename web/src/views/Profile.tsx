import React, {useState, useEffect} from 'react';
import {
    Avatar,
    Button,
    Stack,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box,
    Typography
} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import DrawerAppBar from "../components/home_page/NavBar";
import {AVATAR_MAPPING} from "../utils/avatars";
import '../styles/profile/user_profile_styles.scss';
import {AuthService} from "../services/auth";
import LoadingSpinner from "../components/loading_spinner/LoadingSpinner";
import Alert from '../components/alert/Alert';

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
    const [avatar, setAvatar] = useState(AVATAR_MAPPING.Avatar_1);
    const [openAvatarSelection, setOpenAvatarSelection] = useState(false);
    const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("");
    const [userId, setUserId] = useState("");
    const [nicknameError, setNicknameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const user = await AuthService.getCurrentUser();
                setUsername(user.username);
                setUserEmail(user.email);
                setUserRole(user.role);
                setAvatar(getAvatarPath(user.avatar));
                setUserId(user.id);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setTimeout(() => setIsLoading(false), 500);
            }
        };

        fetchUserData();
    }, []);

    const getAvatarPath = (avatarName: string) => {
        // @ts-ignore
        return AVATAR_MAPPING[avatarName] || AVATAR_MAPPING.Avatar_1;
    };

    const handleOpen = (modalType: 'nickname' | 'email' | 'password' | 'avatar' | 'deleteAccount') => {
        if (modalType === 'nickname') setOpenNickname(true);
        else if (modalType === 'email') setOpenEmail(true);
        else if (modalType === 'password') setOpenPassword(true);
        else if (modalType === 'avatar') setOpenAvatarSelection(true);
        else if (modalType === 'deleteAccount') setOpenDeleteAccount(true);
    };

    const handleClose = (modalType: 'nickname' | 'email' | 'password' | 'avatar' | 'deleteAccount') => {
        if (modalType === 'nickname') setOpenNickname(false);
        else if (modalType === 'email') setOpenEmail(false);
        else if (modalType === 'password') setOpenPassword(false);
        else if (modalType === 'avatar') setOpenAvatarSelection(false);
        else if (modalType === 'deleteAccount') setOpenDeleteAccount(false);
    };

    const handleReset = () => {
        setEmail("");
        setNickname("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const validateNickname = (nickname: string): boolean => {
        if (!/^[a-zA-Z0-9_]{3,20}$/.test(nickname)) {
            setNicknameError("Nickname must be 3-20 characters long and contain only letters, numbers, or underscores.");
            return false;
        }
        return true;
    };

    const validateEmail = (email: string): boolean => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)) {
            setEmailError("Invalid email format.");
            return false;
        }
        return true;
    };

    const validatePassword = (password: string): boolean => {
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            return false;
        }
        return true;
    };

    const handleSave = async (modalType: 'nickname' | 'email' | 'password') => {
        setIsLoading(true);
        setNicknameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');

        let isValid = true;
        if (modalType === 'nickname' && !validateNickname(nickname)) isValid = false;
        if (modalType === 'email' && !validateEmail(email)) isValid = false;
        if (modalType === 'password') {
            if (!validatePassword(newPassword)) isValid = false;
            if (newPassword !== confirmPassword) {
                setConfirmPasswordError("Passwords do not match.");
                isValid = false;
            }
        }

        if (!isValid) {
            setIsLoading(false);
            return;
        }

        try {
            if (modalType === 'nickname') {
                await AuthService.updateAccount({
                    username: nickname,
                    current_password: currentPassword
                });
                handleClose('nickname');
                setTimeout(() => {
                    setUsername(nickname);
                    setIsLoading(false);
                }, 500);
            } else if (modalType === 'email') {
                await AuthService.updateAccount({
                    email: email,
                    current_password: currentPassword
                });
                handleClose('email');
                setTimeout(() => {
                    setIsLoading(false);
                    setAlertMessage("Email changed, please sign in with new login");
                }, 500);
            } else if (modalType === 'password') {
                await AuthService.updateAccount({
                    current_password: currentPassword,
                    password: newPassword,
                    re_password: confirmPassword
                });
                handleClose('password');
                setTimeout(() => setIsLoading(false), 500);
            }
        } catch (error: any) {
            if (error.response?.status === 400) {
                if (error.response.data?.email) {
                    setEmailError("Email already taken");
                } else if (error.response.data?.username) {
                    setNicknameError("Nickname already taken");
                } else {
                    setPasswordError("Update failed, please try again.");
                }
            } else {
                setPasswordError("Update failed: " + error.message);
            }
            setIsLoading(false);
        } finally {
            handleReset();
        }
    };

    const handleChange = (value: string, type: 'nickname' | 'email' | 'currentPassword' | 'newPassword' | 'confirmPassword') => {
        if (type === 'nickname') setNickname(value);
        else if (type === 'email') setEmail(value);
        else if (type === 'currentPassword') setCurrentPassword(value);
        else if (type === 'newPassword') setNewPassword(value);
        else if (type === 'confirmPassword') setConfirmPassword(value);
    };

    const handleAvatarSelect = async (selectedAvatar: string) => {
        setIsLoading(true);
        try {
            await AuthService.updateAvatar(userId, {avatar: selectedAvatar});
            // @ts-ignore
            setAvatar(AVATAR_MAPPING[selectedAvatar]);
            handleClose('avatar');
            setTimeout(() => setIsLoading(false), 500);
        } catch (error) {
            // @ts-ignore
            setPasswordError("Failed to update avatar: " + error.message);
            setIsLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await AuthService.deleteAccount({email: userEmail, password: currentPassword});
        } catch (error: any) {
            if (error.response?.status === 401) {
                setAlertMessage("Account deleted");
                setOpenDeleteAccount(false);
            } else {
                setPasswordError("Incorrect password");
                setCurrentPassword("");
            }
        }
    };

    const handleUserStatsClick = () => {
        setIsLoading(true);
        navigate('/user-stats');
        setTimeout(() => setIsLoading(false), 500);
    };

    const handleModeratorPanelClick = () => {
        navigate('/users_moderator_panel');
    };

    const handleCloseAlert = async () => {
        setAlertMessage(null);
        navigate('/signin');
    };

    return (
        <ThemeProvider theme={theme}>
            <DrawerAppBar/>
            <Container component="main" className="user-profile-page"
                       sx={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {isLoading ? (
                    <LoadingSpinner/>
                ) : (
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{height: '100%', width: '100%'}}
                    >
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{width: '100%', flex: 1}}
                        >
                            <Avatar src={avatar} sx={{width: '50%', height: 'auto', cursor: 'pointer'}}
                                    onClick={() => handleOpen('avatar')}/>
                            <Typography variant="h6" className="username">{username}</Typography>
                        </Stack>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{width: '100%', flex: 1}}
                        >
                            <div style={{width: '100%', maxWidth: '480px'}}>
                                {(userRole === 'Admin' || userRole === 'Moderator') && (
                                    <Button variant="contained" fullWidth className="moderator-panel-button"
                                            sx={{marginBottom: '24px', padding: '20px 0'}}
                                            onClick={handleModeratorPanelClick}>Moderator Panel</Button>
                                )}
                                <Button variant="contained" fullWidth className="user-stats-button"
                                        sx={{marginBottom: '24px', padding: '20px 0'}} onClick={handleUserStatsClick}>User
                                    Stats</Button>
                                <Button variant="contained" fullWidth className="change-nickname-button"
                                        sx={{marginBottom: '24px', padding: '20px 0'}}
                                        onClick={() => handleOpen('nickname')}>Change Nickname</Button>
                                <Button variant="contained" fullWidth className="change-email-button"
                                        sx={{marginBottom: '24px', padding: '20px 0'}}
                                        onClick={() => handleOpen('email')}>Change Email</Button>
                                <Button variant="contained" fullWidth className="change-password-button"
                                        sx={{marginBottom: '24px', padding: '20px 0'}}
                                        onClick={() => handleOpen('password')}>Change Password</Button>
                                <Button variant="contained" fullWidth className="delete-account-button"
                                        sx={{padding: '20px 0'}} onClick={() => handleOpen('deleteAccount')}>Delete
                                    Account</Button>
                            </div>
                        </Stack>
                    </Stack>
                )}
                <Dialog open={openNickname} onClose={() => handleClose('nickname')}>
                    <DialogTitle>Change Nickname</DialogTitle>
                    <DialogContent>
                        <TextField
                            error={!!nicknameError}
                            helperText={nicknameError}
                            autoFocus
                            margin="dense"
                            id="nickname"
                            label="New Nickname"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={nickname}
                            onChange={(e) => handleChange(e.target.value, 'nickname')}
                        />
                        <TextField
                            margin="dense"
                            id="currentPassword"
                            label="Current Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={currentPassword}
                            onChange={(e) => handleChange(e.target.value, 'currentPassword')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose('nickname')}>Cancel</Button>
                        <Button onClick={() => handleSave('nickname')}>Save</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openEmail} onClose={() => handleClose('email')}>
                    <DialogTitle>Change Email</DialogTitle>
                    <DialogContent>
                        <TextField
                            error={!!emailError}
                            helperText={emailError}
                            autoFocus
                            margin="dense"
                            id="email"
                            label="New Email"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={email}
                            onChange={(e) => handleChange(e.target.value, 'email')}
                        />
                        <TextField
                            margin="dense"
                            id="currentPassword"
                            label="Current Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={currentPassword}
                            onChange={(e) => handleChange(e.target.value, 'currentPassword')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose('email')}>Cancel</Button>
                        <Button onClick={() => handleSave('email')}>Save</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openPassword} onClose={() => handleClose('password')}>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogContent>
                        <TextField
                            error={!!passwordError}
                            helperText={passwordError}
                            autoFocus
                            margin="dense"
                            id="currentPassword"
                            label="Current Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={currentPassword}
                            onChange={(e) => handleChange(e.target.value, 'currentPassword')}
                        />
                        <TextField
                            error={!!passwordError}
                            helperText={passwordError}
                            margin="dense"
                            id="newPassword"
                            label="New Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={newPassword}
                            onChange={(e) => handleChange(e.target.value, 'newPassword')}
                        />
                        <TextField
                            error={!!confirmPasswordError}
                            helperText={confirmPasswordError}
                            margin="dense"
                            id="confirmPassword"
                            label="Confirm New Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={confirmPassword}
                            onChange={(e) => handleChange(e.target.value, 'confirmPassword')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose('password')}>Cancel</Button>
                        <Button onClick={() => handleSave('password')}>Save</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openAvatarSelection} onClose={() => handleClose('avatar')} maxWidth="md" fullWidth>
                    <DialogTitle>Select Avatar</DialogTitle>
                    <DialogContent dividers>
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {xs: '1fr', sm: '1fr 1fr'},
                            gap: 2,
                            overflowY: {xs: 'scroll', sm: 'unset'},
                            maxHeight: {xs: 400, sm: 'unset'}
                        }}>
                            <Avatar src={AVATAR_MAPPING.Avatar_1} sx={{cursor: 'pointer', width: 200, height: 200}}
                                    onClick={() => handleAvatarSelect('Avatar_1')}/>
                            <Avatar src={AVATAR_MAPPING.Avatar_2} sx={{cursor: 'pointer', width: 200, height: 200}}
                                    onClick={() => handleAvatarSelect('Avatar_2')}/>
                            <Avatar src={AVATAR_MAPPING.Avatar_3} sx={{cursor: 'pointer', width: 200, height: 200}}
                                    onClick={() => handleAvatarSelect('Avatar_3')}/>
                            <Avatar src={AVATAR_MAPPING.Avatar_4} sx={{cursor: 'pointer', width: 200, height: 200}}
                                    onClick={() => handleAvatarSelect('Avatar_4')}/>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose('avatar')}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openDeleteAccount} onClose={() => handleClose('deleteAccount')}>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="currentPassword"
                            label="Current Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={currentPassword}
                            onChange={(e) => handleChange(e.target.value, 'currentPassword')}
                            error={!!passwordError}
                            helperText={passwordError}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose('deleteAccount')}>Cancel</Button>
                        <Button onClick={handleDeleteAccount}>Delete</Button>
                    </DialogActions>
                </Dialog>
                {alertMessage && <Alert message={alertMessage} onClose={handleCloseAlert}/>}
            </Container>
        </ThemeProvider>
    );
};

export default UserProfilePage;

