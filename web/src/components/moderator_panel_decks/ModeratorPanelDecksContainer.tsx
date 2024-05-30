import React, {useEffect, useState} from 'react';
import ButtonDeckModeratorPanel from "./ButtonDeckModeratorPanel";
import '../../styles/moderator_panel_decks/moderator_panel_decks_container.scss';
import {DeckService} from '../../services/decs';
import {ReportService} from "../../services/report";
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
import ButtonNotMemorizedFlashCards from "../not_memorized_flashcards/ButtonNotMemorizedFlashCards";

const ModeratorPanelDecksContainer = () => {
    const navigate = useNavigate();
    const fields_color = "#7c3bd1";
    const decks_button_color = "#d91ed6";
    const [decks, setDecks] = useState([]);
    const [filterString, setFilterString] = useState('');
    const [isLoadingFetchDecks, setIsLoadingFetchDecks] = useState(true);


    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const response = await ReportService.get_all_reported_decks();
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

            const response = await ReportService.get_all_reported_decks();

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
        navigate("/reported_Deck")
    }


// @ts-ignore
    return (
        <div className="website-moderator-panel-container-decks">
            <p className="web-title">Reported Decks</p>
            {isLoadingFetchDecks ? (
                <LoadingSpinner/>
            ) : (
                <>
                    {decks.length === 0 ? (
                        <>

                            <div className={'no-decks-container'}>
                                <p className={"no-decks-cards-text"}>No Decks</p>
                            </div>
                            <div className="filter-container-no-decks">

                                <ButtonCreateFlashCardPage
                                    color={decks_button_color}
                                    text={'Users'}
                                    border={'2px solid black'}
                                    image={profile}
                                    onClick={navigateUsersRanking}
                                />
                            </div>
                        </>


                    ) : (
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
                                    text={'Users'}
                                    border={'2px solid black'}
                                    image={profile}
                                    onClick={navigateUsersRanking}
                                />
                            </div>
                            <div className="decks-container">
                                {decks.slice(0, 20).map((deck, index) => (
                                    <div className="decks-button" key={index}>
                                        <ButtonDeckModeratorPanel
                                            frontTextUpper={`${deck['title']}`}
                                            frontTextLower={`${deck['deck_category']}`}
                                            backText={`Reported by: ${deck['submitter']}`}
                                            onClick={() => navigatePublicDecksFlashCards(deck['id'])}
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

export default ModeratorPanelDecksContainer;