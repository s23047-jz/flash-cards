// @ts-ignore
import speaker from '../../assets/Speaker.png';
// @ts-ignore
import speaker_blue from '../../assets/Speaker_blue.png';
// @ts-ignore
import React, {useEffect, useState} from "react";
import FlashCard from "../flash_cards/FlashCard";
import PublicDeckFlashCardField from "../public_decks_flashcards/PublicDeckFlashCardField";
import {DeckService} from '../../services/decs';
import ButtonsContainerModeratorPanel from "./ButtonsContainerModeratorPanel";
import LoadingSpinner from "../loading_spinner/LoadingSpinner";
import "../../styles/moderator_panel_decks/public_deck_all_flashcards_container_modertor_panel.scss"
import {ReportService} from "../../services/report";

import {useNavigate} from 'react-router-dom';

const PublicDecksFlashCardsContainer = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentBigCardIndex, setCurrentBigCardIndex] = useState(0);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [isSpeakingBigCard, setIsSpeakingBigCard] = useState(false);
    const [deckTitle, setDeckTitle] = useState(false);
    const numberOfFlashCards = flashcards.length
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
                            const response = await DeckService.get_flash_cards_from_deck(deck_id);
                            // @ts-ignore
                            setFlashcards(response);
                            setIsLoading(false);
                        }, 500);
                    }
                }, 100);

            } catch (error) {
                console.error(error);
            }
        };

        fetchFlashCards();
    }, []);
    const handleSpeak = (text_front: string, text_back: string, index: number) => {
        if ('speechSynthesis' in window) {
            const text: string = text_front + "." + text_back
            const sentences = text.split('.');
            sentences.forEach((sentence, i) => {
                const speech = new SpeechSynthesisUtterance(sentence.trim());
                speech.lang = 'en-GB';
                speech.rate = 0.9;
                speech.pitch = 1.2;
                speech.volume = 1.0;

                speech.onstart = () => {
                    setCurrentCardIndex(index);
                    setIsSpeaking(true);
                };

                if (i === sentences.length - 1) {
                    speech.onend = () => {
                        setCurrentCardIndex(-1);
                        setIsSpeaking(false);
                    };
                }

                window.speechSynthesis.speak(speech);
            });
            if (isSpeakingBigCard) {
                setCurrentCardIndex(flashcards.length);
            }

        } else {
            console.log('Speech synthesis not supported.');
        }
    };

    const handleSpeakerClick = (flashcard: any, index: number) => {
        setIsSpeakingBigCard(false)
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            handleSpeak(flashcard['title'], flashcard['card text'], index);
        }
    };

    const handleSpeakerBigCardClick = () => {
        setIsSpeakingBigCard(true)
        const currentBigFlashCard = flashcards[currentBigCardIndex];
        if (!isRotated) {
            handleSpeak(currentBigFlashCard['title'], '', currentBigCardIndex);
        } else {
            handleSpeak(currentBigFlashCard['card text'], '', currentBigCardIndex);
        }
        if (isSpeaking) {
            setIsSpeakingBigCard(false)
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    const handleNextClick = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        if (currentBigCardIndex < flashcards.length - 1) {
            setCurrentBigCardIndex(currentBigCardIndex + 1);
            setIsRotated(false)
        }
    };

    const handlePrevClick = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        if (currentBigCardIndex > 0) {
            setCurrentBigCardIndex(currentBigCardIndex - 1);
            setIsRotated(false)
        }
    };

    const handleRotateClick = () => {
        setIsRotated(!isRotated);
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    const handleBackToDecks = () => {
        navigate('/moderator_panel_decks')
    };

    const handleDeleteDeckFromApp= () => {
        const deckDataString = localStorage.getItem("deckData");
        const deckData = JSON.parse(deckDataString || "{}");
        let deck_id = deckData.id;


        ReportService.delete_deck_from_app(deck_id)
        navigate('/moderator_panel_decks')
    }

    const handleDeleteDeckFromReportedList = () => {
        const deckDataString = localStorage.getItem("deckData");
        const deckData = JSON.parse(deckDataString || "{}");
        let deck_id = deckData.id;


        ReportService.delete_deck_from_reported_list(deck_id)
        navigate('/moderator_panel_decks')
    }

    return (
        <div className={"public-decks-all-flashcards-container-moderator-panel"}>
            {isLoading ? (
                <LoadingSpinner/>
            ) : (

                <>

                    <FlashCard
                        front_text={flashcards[currentBigCardIndex]['title']}
                        back_text={flashcards[currentBigCardIndex]['card text']}
                        left_corner_text={`${currentBigCardIndex + 1}/${numberOfFlashCards} ${deckTitle}`}
                        icon={isSpeakingBigCard && isSpeaking ? speaker_blue : speaker}
                        isRotated={isRotated}
                        onIconClick={() => handleSpeakerBigCardClick()}
                    />
                    <ButtonsContainerModeratorPanel
                        onClickPrev={handlePrevClick}
                        onClickNext={handleNextClick}
                        onClickRotate={handleRotateClick}
                        onClickBackToDecks={handleBackToDecks}
                        onClickDeleteDeckFromReportedList={handleDeleteDeckFromReportedList}
                        onClickDeleteDeckFromApp={handleDeleteDeckFromApp}
                    />
                    <p className={"all-flashcards-text"}>All Flashcards</p>
                    {flashcards.map((flashcard, index) => (

                        <PublicDeckFlashCardField
                            key={index}
                            front_text={flashcard['title']}
                            back_text={flashcard['card text']}
                            icon={currentCardIndex === index && isSpeaking && !isSpeakingBigCard ? speaker_blue : speaker}
                            onClick={() => handleSpeakerClick(flashcard, index)}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default PublicDecksFlashCardsContainer;