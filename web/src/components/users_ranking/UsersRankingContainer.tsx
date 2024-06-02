import React, {useEffect, useState} from 'react';
import ButtonUserRanking from "./ButtonUserRanking";
import '../../styles/users_ranking/users_ranking_container.scss';
import {DeckService} from '../../services/decs';
import {ActiveUser} from "../../services/user";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import ButtonCreateFlashCardPage from "../flash_cards_creator/ButtonCreateFlashCardPage";
// @ts-ignore
import filter from "../../assets/Filter.png";
// @ts-ignore
import cards from "../../assets/purple_cards.png"
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../loading_spinner/LoadingSpinner";
// @ts-ignore
import avatar_1 from "../../assets/avatars/Avatar_1.png"
// @ts-ignore
import avatar_2 from "../../assets/avatars/Avatar_2.png"
// @ts-ignore
import avatar_3 from "../../assets/avatars/Avatar_3.png"
// @ts-ignore
import avatar_4 from "../../assets/avatars/Avatar_4.png"
import {Avatar_1} from "../../assets/avatars";

// @ts-ignore
const avatarsDict = {
    "Avatar_1": avatar_1,
    "Avatar_2": avatar_2,
    "Avatar_3": avatar_3,
    "Avatar_4": avatar_4,
};

const UsersRankingContainer = () => {
    const navigate = useNavigate();
    const fields_color = "#7c3bd1";
    const decks_button_color = "#d91ed6";
    const [users, setUsers] = useState([]);
    const [filterString, setFilterString] = useState('');
    const [isLoadingFetchUsers, setIsLoadingFetchUsers] = useState(true);


    useEffect(() => {
        const fetchUsers = async () => {
            try {

                const response = await ActiveUser.get_users_ranking();
                setUsers(response['users']);

                setTimeout(() => {
                    setIsLoadingFetchUsers(false);
                }, 500);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);


    const handleFilterUsers = async () => {
        try {
            const response = await ActiveUser.get_users_ranking();
            setUsers(response['users']);
            // @ts-ignore
            const filteredUsers = response['users'].filter(user => {
                const nameMatches = !filterString || user.username.toLowerCase().includes(filterString.toLowerCase());

                return nameMatches;
            });
            setUsers(filteredUsers);
        } catch (error) {
            console.error(error);
        }
    };


    const navigateDeckRanking = () => {
        navigate("/decks_ranking")
    }

    const navigatePublicUserDecks = (user_id: string) => {
        localStorage.setItem("userRankingDataId", JSON.stringify({user_id}))
        navigate("/public_decks_user_ranking")
    }

// @ts-ignore
    return (
        <div className="website-container-users-ranking">
            <p className="web-title">Users Ranking</p>
            {isLoadingFetchUsers ? (
                <LoadingSpinner/>
            ) : (
                <>
                    <>
                        <div className="filter-container">
                            <FormControl variant="filled">
                                <InputLabel htmlFor="component-filled"
                                            sx={{backgroundColor: fields_color, color: 'white'}}>Filter
                                    Users</InputLabel>
                                <FilledInput
                                    id="component-filled"
                                    defaultValue=""
                                    sx={{
                                        "& input": {
                                            backgroundColor: fields_color,
                                            color: 'white',
                                            borderRadius: '10px',
                                            border: '2px solid black',
                                        }
                                    }}
                                    disableUnderline
                                    onChange={(e) => setFilterString(e.target.value)}
                                />
                            </FormControl>
                            <ButtonCreateFlashCardPage
                                color={fields_color}
                                text={'Filter'}
                                border={'2px solid black'}
                                image={filter}
                                onClick={handleFilterUsers}
                            />
                            <ButtonCreateFlashCardPage
                                color={decks_button_color}
                                text={'Decks Ranking'}
                                border={'2px solid black'}
                                image={cards}
                                onClick={navigateDeckRanking}
                            />
                        </div>
                        <div className="users-container">
                            {users.map((user, index) => {
                                let avatar = `../../assets/avatars/${user['shared_decks']}.png`
                                return (
                                    <div className="users-button" key={index}>
                                        <ButtonUserRanking
                                            rankingPosition={user['rank']}
                                            frontTextUpper={`${user['username']}`}
                                            frontTextLower={`Public decks: ${user['shared_decks']}`}
                                            image={avatarsDict[`${user['avatar']}`]}
                                            backText={`Ranking position: ${user['rank']}`}
                                            onClick={() => navigatePublicUserDecks(user['id'])}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </>
                </>
            )}
        </div>
    );
};

export default UsersRankingContainer;