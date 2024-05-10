// @ts-ignore
import speaker from '../../assets/Speaker.png';
// @ts-ignore
import speaker_blue from '../../assets/Speaker_blue.png';
// @ts-ignore
import React, {useEffect, useRef, useState} from "react";
import FlashCardVoiceMode from "../voice_control/FlashCardVoiceMode";
import {DeckService} from '../../services/decs';
// @ts-ignore
import LoadingSpinner from "../loading_spinner/LoadingSpinner";
import "../../styles/learning_mode/cards_buttons_container_learning_mode.scss"
import ButtonsContainerLearningMode from "./ButtonsContainerLearningMode";
import {useNavigate} from 'react-router-dom';
import ButtonNotMemorizedFlashCards from "../not_memorized_flashcards/ButtonNotMemorizedFlashCards";



const CardsButtonsContainerLearningMode = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [flashcardsUpdated, setFlashcardsUpdated] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [currentBigCardIndex, setCurrentBigCardIndex] = useState(0);
    const [isRotated, setIsRotated] = useState(false);
    const [isSpeakingBigCard, setIsSpeakingBigCard] = useState(false);
    const [deckTitle, setDeckTitle] = useState(false);
    const [textControl, setTextControl] = useState('');
    const [isListening, setIsListening] = useState(false);
    const numberOfFlashCards = flashcards.length;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlashCards = async () => {
            try {
                let deck_id: string;

                const intervalId = setInterval(() => {
                    const deckDataString = localStorage.getItem("deckData");
                    const deckData = JSON.parse(deckDataString || "{}");
                    deck_id = deckData.id;
                    setDeckTitle(deckData.title);
                    if (deck_id) {
                        clearInterval(intervalId);
                        setTimeout(async () => {
                            const response = await DeckService.get_not_memorized_flash_cards_from_deck(deck_id);
                            // @ts-ignore
                            setFlashcards(response);

                            setIsLoading(false)
                        }, 300);
                    }
                }, 100);

            } catch (error) {
                console.error(error);
            }
        };
        fetchFlashCards();


    }, [isSpeakingBigCard, currentBigCardIndex]);


    const handleSpeak = (text: string) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = 'en-GB';
            speech.rate = 0.9;
            speech.pitch = 1.2;
            speech.volume = 1.0;

            setIsSpeakingBigCard(true);
            speech.onend = () => {
                setIsSpeakingBigCard(false);
                setTextControl('');
            };

            window.speechSynthesis.speak(speech);
        } else {
            console.log('Speech synthesis not supported.');
        }
    };

    const handleSpeakerBigCardClick = () => {
        setIsSpeakingBigCard(true);
        if (flashcards.length > 0) {
            let currentBigFlashCard = flashcards[currentBigCardIndex];
            if (!isRotated) {
                handleSpeak(currentBigFlashCard['title']);
            } else {
                handleSpeak(currentBigFlashCard['card text']);
            }
        }
        if (isSpeakingBigCard) {
            setIsSpeakingBigCard(false);
            window.speechSynthesis.cancel();
        }
    }


    const handleNextClick = () => {
        window.speechSynthesis.cancel();
        setIsSpeakingBigCard(false);
        if (currentBigCardIndex < flashcards.length - 1) {
            setCurrentBigCardIndex(currentBigCardIndex + 1);
            setIsRotated(false)
        }
    };

    const handlePrevClick = () => {
        window.speechSynthesis.cancel();
        setIsSpeakingBigCard(false);
        if (currentBigCardIndex > 0) {
            setCurrentBigCardIndex(currentBigCardIndex - 1);
            setIsRotated(false)
        }
    };

    const handleRotateClick = () => {
        window.speechSynthesis.cancel();
        setIsRotated(!isRotated);
        if (isSpeakingBigCard) {
            window.speechSynthesis.cancel();
            setIsSpeakingBigCard(false);
        }
    };

    const navigatePrevSide = () => {
        navigate('/my_deck_learning_modes')
    }


    const handleReject = () => {
        handleNextClick()

        if (currentBigCardIndex == flashcards.length - 1) {
            navigate('/my_deck_learning_modes')
        }
    }

    const handleAccept = (flash_card_id: string) => {
        handleNextClick()

        const flashcard_body = {
            // @ts-ignore
            id: flash_card_id,
            is_memorized: true,
        };

        // @ts-ignore
        const updatedFlashcards = flashcardsUpdated.concat(flashcard_body);
        setFlashcardsUpdated(updatedFlashcards);
        if (currentBigCardIndex == flashcards.length - 1 ) {
            DeckService.update_multiple_flash_card(flashcardsUpdated)
            navigate('/my_deck_learning_modes')
        }
    }

    const saveDeck = () => {
        console.log(flashcardsUpdated)
        // @ts-ignore
        DeckService.update_multiple_flash_card(flashcardsUpdated)
        navigate('/my_deck_learning_modes')


    }



    return (
        <div className={"learning-mode-container"}>
            {isLoading ? (
                <LoadingSpinner/>
            ) : (
                <>
                    {flashcards.length === 0 ? (
                        <>
                            <p className={"no-flash-cards-text"}>No Flashcards</p>
                            <div className={'button-back-to-deck'}>
                                <ButtonNotMemorizedFlashCards onClick={navigatePrevSide} text={'Back To Deck'}
                                                              color={'#e05a12'}
                                                              border={'3px solid black'}/>

                            </div>
                        </>
                    ) : (
                        <>

                            <FlashCardVoiceMode
                                front_text={flashcards[currentBigCardIndex]['title']}
                                back_text={flashcards[currentBigCardIndex]['card text']}
                                left_corner_text={`${currentBigCardIndex + 1}/${numberOfFlashCards} ${deckTitle}`}
                                icon={isSpeakingBigCard ? speaker_blue : speaker}
                                isRotated={isRotated}
                                onIconClick={handleSpeakerBigCardClick}
                                isMicrophoneListening={isListening}
                            />

                            <ButtonsContainerLearningMode
                                onClickPrev={handleReject}
                                onClickNext={() => handleAccept(flashcards[currentBigCardIndex]['id'])}
                                onClickRotate={handleRotateClick}
                                onClickPrevSide={() => saveDeck()}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default CardsButtonsContainerLearningMode;