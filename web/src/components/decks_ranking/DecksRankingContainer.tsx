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
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../loading_spinner/LoadingSpinner";
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
                const response = await DeckService.get_decks_ranking();
                // @ts-ignore
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

            const response = await DeckService.get_decks_ranking();

            // @ts-ignore
            const filteredDecks = response.filter(deck => {
                const titleMatches = !filterString || deck.title.toLowerCase().includes(filterString.toLowerCase());
                const categoryMatches = !filterString || deck.deck_category.toLowerCase() === filterString.toLowerCase();

                return titleMatches || categoryMatches;
            });

            setDecks(filteredDecks);
        } catch (error) {
            console.error(error);
        }
    };


    const navigateUsersRanking = () => {
        navigate("/users_ranking")
    }

    const navigatePublicDecksFlashCards = async (deck_id: string) => {
        DeckService.get_deck_by_id(deck_id)
        navigate("/public_decks_flashcards")
    }


// @ts-ignore
    return (
        <div className="website-container-decks-ranking">
            <p className="web-title">Decks Ranking</p>
            {isLoadingFetchDecks ? (
                <LoadingSpinner/>
            ) : (
                <>
                    <>
                        <div className="filter-container">
                            <FormControl variant="filled">
                                <InputLabel htmlFor="component-filled"
                                            sx={{backgroundColor: fields_color, color: 'white'}}>Filter
                                    Decks</InputLabel>
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
                            {decks.slice(0, 20).map((deck, index) => (
                                <div className="decks-button" key={index}>
                                    <ButtonDeckRanking
                                        rankingPosition={`${deck['ranking']}`}
                                        frontTextUpper={`${deck['title']}`}
                                        frontTextLower={`${deck['deck_category']}`}
                                        backText={`Downloads: ${deck['downloads']}`}
                                        onClick={() => navigatePublicDecksFlashCards(deck['id'])}
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

export default DecksRankingContainer;