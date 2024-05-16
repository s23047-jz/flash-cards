import React, {useEffect, useState} from 'react';
import ButtonDeckRanking from "./ButtonDeckRanking";
import '../../styles/decks_ranking/decks_ranking_container.scss';
import {DeckService} from '../../services/decs';
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
import ButtonNotMemorizedFlashCards from "../not_memorized_flashcards/ButtonNotMemorizedFlashCards";
// @ts-ignore
import profile from "../../assets/Profile.png"

const DecksRankingContainer = () => {
    const navigate = useNavigate();
    const fields_color = "#7c3bd1";
    const decks_button_color = "#d91ed6";
    const [decks, setDecks] = useState([]);
    const [filterString, setFilterString] = useState('');
    const [isLoadingFetchDecks, setIsLoadingFetchDecks] = useState(true);



    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const response = await DeckService.get_all_user_decks();
                setDecks(response);

                setTimeout(() => {
                    setIsLoadingFetchDecks(false);
                }, 500);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDecks();
    }, []);



    const handleFilterDecks = async () => {
        try {
            const response = await DeckService.get_filtered_decks(filterString);
            setDecks(response);
        } catch (error) {
            console.error(error);
        }
    };

    const navigateToDeckFlashcards = async (deck_id: string) => {
        navigate("/my_deck_learning_modes")
        DeckService.get_deck_by_id(deck_id)

    }

    const navigateHomePage = () =>{
        navigate("/create_deck")
    }

    const navigateUsersRanking = () =>{
        navigate("/users_ranking")
    }


// @ts-ignore
 return (
        <div className="website-container-decks-ranking">
            <p className="web-title">Decks Ranking</p>
            {isLoadingFetchDecks ? (
                <LoadingSpinner />
            ) : (
                <>
                    {decks.length === 0 ? (
                        <div className={'no-decks-container'}>
                            <p className={"no-decks-cards-text"}>No Decks</p>
                            <div className={'button-create-decks'}>
                                <ButtonNotMemorizedFlashCards onClick={navigateHomePage} text={'Create Deck'} color={'#e05a12'} border={'3px solid black'}/>
                            </div>
                        </div>
                    ) : (
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
                                    onClick={handleFilterDecks}
                                />
                                 <ButtonCreateFlashCardPage
                                    color={decks_button_color}
                                    text={'Users Ranking'}
                                    border={'2px solid black'}
                                    image={profile}
                                    onClick={navigateUsersRanking}
                                />
                            </div>
                            <div className="decks-container">
                                {decks.map((deck, index) => (
                                    <div className="decks-button" key={index}>
                                        <ButtonDeckRanking
                                            rankingPosition={"2137"}
                                            frontTextUpper={`${deck['title']}`}
                                            frontTextLower={`${deck['deck_category']}`}
                                            backText={`Number of flashcards: ${deck['number_of_cards']}`}
                                            onClick={() => navigateToDeckFlashcards(deck['id'])}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default DecksRankingContainer;