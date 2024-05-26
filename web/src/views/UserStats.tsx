import React, { useEffect, useState } from 'react';
import { Avatar, Container, Stack, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import avatar1 from '../assets/Avatar_1.png';
import '../styles/profile/user_profile_styles.scss';
import { AuthService } from "../services/auth";

const theme = createTheme();

const UserStatsPage: React.FC = () => {
    const [ranking, setRanking] = useState<number>(0);
    const [createdDecks, setCreatedDecks] = useState<number>(0);
    const [publicDecks, setPublicDecks] = useState<number>(0);
    const [avatar, setAvatar] = useState(avatar1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userStats = await AuthService.getUserStats();
                // @ts-ignore
                setRanking(userStats.ranking);
                // @ts-ignore
                setCreatedDecks(userStats.createdDecks);
                // @ts-ignore
                setPublicDecks(userStats.publicDecks);
                // @ts-ignore
                setAvatar(userStats.avatar); // Assuming the avatar URL is part of the user stats response
            } catch (error) {
                console.error("Failed to fetch user stats: ", error);
            }
        };

        fetchData();
    }, []);

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
                        <div className="user-stats-container">
                            <div className="shape-background"></div>
                            <div>
                                <Typography variant="h4" className="stat-title">
                                    Ranking: <span className="stat-number">{ranking}</span>
                                </Typography>
                                <Typography variant="h4" className="stat-title">
                                    Created Decks: <span className="stat-number">{createdDecks}</span>
                                </Typography>
                                <Typography variant="h4" className="stat-title">
                                    Public Decks: <span className="stat-number">{publicDecks}</span>
                                </Typography>
                            </div>
                        </div>
                    </Stack>
                </Stack>
            </Container>
        </ThemeProvider>
    );
};

export default UserStatsPage;
