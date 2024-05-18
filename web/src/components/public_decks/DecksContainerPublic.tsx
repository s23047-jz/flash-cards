import React, {useEffect, useState} from 'react';
import DeckButton from "../my_deck_page/DeckButton";
import '../../styles/my_decks/decks_container.scss';
import {DeckService} from '../../services/decs';
// @ts-ignore
import red_cards from '../../assets/Red_cards.png';
// @ts-ignore
import pink_cards from '../../assets/Pink_cards.png';
// @ts-ignore
import yellow_cards from '../../assets/Yellow_cards.png';
// @ts-ignore
import dark_blue_cards from '../../assets/dark_blue_cards.png';
// @ts-ignore
import dark_pink_cards from '../../assets/dark_pink_cards.png';
// @ts-ignore
import light_blue_cards from '../../assets/light_blue_cards.png';
// @ts-ignore
import light_green_cards from '../../assets/light_green_cards.png';
// @ts-ignore
import light_green_cards_2 from '../../assets/light_green_cards2.png';
// @ts-ignore
import light_yellow_cards from '../../assets/light_yellow_cards.png';
// @ts-ignore
import purple_cards from '../../assets/purple_cards.png';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import ButtonCreateFlashCardPage from "../flash_cards_creator/ButtonCreateFlashCardPage";
// @ts-ignore
import filter from "../../assets/Filter.png";
import {useNavigate} from "react-router-dom";
import LoadingSpinner from "../loading_spinner/LoadingSpinner";
import ButtonNotMemorizedFlashCards from "../not_memorized_flashcards/ButtonNotMemorizedFlashCards";


const DecksContainerPublic = () => {
    const navigate = useNavigate();
    const fields_color = "#7c3bd1";
    const [decks, setDecks] = useState([]);
    const [filterString, setFilterString] = useState('');
    const [cardColors, setCardColors] = useState<string[]>([]);
    const [isLoadingFetchDecks, setIsLoadingFetchDecks] = useState(true);
    const [isFilterDecks, setIsFilterDecks] = useState(false)



    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const response = await DeckService.get_all_imported_decks();
                setDecks(response);
                if (cardColors.length === 0) {
                    setCardColors(generateRandomCardColors(response.length));
                }
                setTimeout(() => {
                    setIsLoadingFetchDecks(false);
                }, 500);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDecks();
    }, []);

    const cardImages = [red_cards, pink_cards, yellow_cards, purple_cards, light_yellow_cards,
        light_green_cards_2, light_green_cards, light_blue_cards, dark_pink_cards, dark_blue_cards];

    const generateRandomCardColors = (numColors: number) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const randomIndex = Math.floor(Math.random() * cardImages.length);
            colors.push(cardImages[randomIndex]);
        }
        return colors;
    };

    const handleFilterDecks = async () => {
        setIsFilterDecks(true)
        try {
            const response = await DeckService.get_filtered_imported_decks(filterString);
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


// @ts-ignore
 return (
        <div className="website-container">
            <p className="web-title">Public Decks</p>
            {isLoadingFetchDecks ? (
                <LoadingSpinner />
            ) : (
                <>
                    {decks.length === 0 && !isFilterDecks ? (
                        <div className={'no-decks-container'}>
                            <p className={"no-decks-cards-text"}>No Decks</p>
                            <div className={'button-create-deck'}>
                                <ButtonNotMemorizedFlashCards onClick={navigateHomePage} text={'Ranking'} color={'#e05a12'} border={'3px solid black'}/>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="filter-container">
                                <FormControl variant="filled">
                                    <InputLabel htmlFor="component-filled" sx={{ backgroundColor: fields_color, color: 'white' }}>Filter Decks</InputLabel>
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
                            </div>
                            <div className="decks-container">
                                {decks.map((deck, index) => (
                                    <div className="deck-button" key={index}>
                                        <DeckButton
                                            frontTextUpper={`${deck['title']}`}
                                            frontTextLower={`${deck['deck_category']}`}
                                            image={cardColors[index]}
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

export default DecksContainerPublic;