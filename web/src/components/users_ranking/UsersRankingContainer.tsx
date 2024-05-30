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
import avatar from "../../assets/avatars/Avatar_1.png"


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

                return nameMatches ;
            });
            setUsers(filteredUsers);
        } catch (error) {
            console.error(error);
        }
    };

    const navigateToDeckFlashcards = async (deck_id: string) => {
        navigate("/my_deck_learning_modes")
        DeckService.get_deck_by_id(deck_id)

    }

    const navigateDeckRanking = () =>{
        navigate("/decks_ranking")
    }

    const navigatePublicUserDecks = (user_id: string) =>{
        localStorage.setItem("userRankingDataId", JSON.stringify({user_id}))
        navigate("/public_decks_user_ranking")
    }

// @ts-ignore
 return (
        <div className="website-container-users-ranking">
            <p className="web-title">Users Ranking</p>
            {isLoadingFetchUsers? (
                <LoadingSpinner />
            ) : (
                <>
                        <>
                            <div className="filter-container">
                                <FormControl variant="filled">
                                    <InputLabel htmlFor="component-filled" sx={{ backgroundColor: fields_color, color: 'white' }}>Filter Users</InputLabel>
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
                                {users.map((user, index) => (
                                    <div className="users-button" key={index}>
                                        <ButtonUserRanking
                                            rankingPosition={user['rank']}
                                            frontTextUpper={`${user['username']}`}
                                            frontTextLower={`Public decks: ${user['shared_decks']}`}
                                            image={avatar}
                                            backText={`Ranking position: ${user['rank']}`}
                                            onClick={()=> navigatePublicUserDecks(user['id'])}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                </>
            )}
        </div>
    );
};

export default UsersRankingContainer;