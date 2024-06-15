// @ts-ignore
import speaker from '../../assets/Speaker.png';
// @ts-ignore
import speaker_blue from '../../assets/Speaker_blue.png';
// @ts-ignore
import React, {useEffect, useState} from "react";
import FlashCard from "./FlashCard";
import FlashCardField from "./FlashCardField";
import {DeckService} from '../../services/decs';
import ButtonsContainer from "../all_flashcards_page_buttons/ButtonsContainer";
import ButtonsContainerLearningMode from "../all_flashcards_page_buttons/ButtonsContainerLearningMode";
import LoadingSpinner from "../loading_spinner/LoadingSpinner";
import "../../styles/flash_cards/flash_cards_container.scss"
// @ts-ignore
import pencil from "../../assets/Pencil.png"
import {useNavigate} from 'react-router-dom';
import Options from '../options/Options'
import FlashCardEditPopUp from "./FlashCardEditPopUp";

const FlashCardsContainer = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentBigCardIndex, setCurrentBigCardIndex] = useState(0);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [isSpeakingBigCard, setIsSpeakingBigCard] = useState(false);
    const [deckTitle, setDeckTitle] = useState(false);
    const [isOpenOptions, setIsOpenOptions] = useState(false);
    const [isDeckPublic, setIsDeckPublic] = useState(false);
    const [popupEditFrontText, setPopupEditFrontText] = useState("");
    const [popupEditBackText, setPopupEditBackText] = useState("");
    const [popupEditFlashCardId, setpopupEditFlashCardId] = useState("");
    const [isEditOpen, setIsEditOpen] = useState(false);
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
                    setIsDeckPublic(deckData.is_deck_public)
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
            const text: string = text_front + ". " + text_back;
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = 'en-GB';
            speech.rate = 0.9;
            speech.pitch = 1.2;
            speech.volume = 1.0;

            const handleSpeechPauseResume = () => {
                let intervalId = setInterval(() => {

                    if (!speechSynthesis.speaking) {
                        clearInterval(intervalId);
                    } else {
                        speechSynthesis.pause();
                        setTimeout(() => {
                            speechSynthesis.resume();
                        }, 50);
                    }
                }, 14000);
            };

            speech.onstart = () => {
                setCurrentCardIndex(index);
                setIsSpeaking(true);
                handleSpeechPauseResume();
            };

            speech.onend = () => {
                setCurrentCardIndex(-1);
                setIsSpeaking(false);
            };

            window.speechSynthesis.speak(speech);

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

    const handleLearnModeClick = () => {
        navigate('/voice_control')
    };

    const handleNotMemorizedFlashcardsClick = () => {
        navigate('/not_memorized_flash_cards')
    };
    const handleMemorizedFlashcardsClick = () => {
        navigate('/memorized_flash_cards')
    };
    const handleBackToDecks = () => {
        navigate('/my_decks')
    };

    const handleLearningMode = () => {
        navigate('/learning_mode')
    };

    const handleOpenOptions = () => {
        if (isOpenOptions) {
            setIsOpenOptions(false)
        } else {
            setIsOpenOptions(true)
        }
    }
    const handleOpenPopup = (frontText: string, backText: string, flashcardId: string) => {
        setPopupEditFrontText(frontText);
        setPopupEditBackText(backText);
        setpopupEditFlashCardId(flashcardId)
        setIsEditOpen(true);
    };

    const handleSaveChanges = () => {
        setIsEditOpen(false);
    };

    const handleDeleteCard = () => {
        setIsEditOpen(false);
    };

    const handleDeleteDeck = () => {
        try {
            const deckDataString = localStorage.getItem("deckData");
            const deckData = JSON.parse(deckDataString || "{}");
            const deck_id = deckData.id;
            DeckService.deleteDeck(deck_id)
            localStorage.removeItem("deckData");
        } catch (error) {
            // @ts-ignore
            console.error(error.message);
            throw error;
        }

        navigate('/my_decks')

    }

    const handleResetDeck = () => {
        try {
            const deckDataString = localStorage.getItem("deckData");
            const deckData = JSON.parse(deckDataString || "{}");
            const deck_id = deckData.id;
            DeckService.update_multiple_flash_card_is_memorized_false(deck_id)
            setIsOpenOptions(false)
        } catch (error) {
            // @ts-ignore
            console.error(error.message);
            throw error;
        }

    }

    const handleShareDeck = () => {
        const deckDataString = localStorage.getItem("deckData");
        const deckData = JSON.parse(deckDataString || "{}");
        const deck_id = deckData.id;
        const user_id = deckData.user_id;
        let deck_body
        console.log(user_id)
        if (isDeckPublic) {
            deck_body = {
                is_deck_public: false,
            }
            setIsDeckPublic(false)
        } else {
            deck_body = {
                is_deck_public: true,
            }
            setIsDeckPublic(true)

        }
        deckData.is_deck_public = isDeckPublic;
        localStorage.setItem("deckData", JSON.stringify(deckData));
        DeckService.update_deck_is_public(deck_body, deck_id)

    }


    return (
        <div className={"all-flashcards-container"}>
            {isLoading ? (
                <LoadingSpinner/>
            ) : (

                <>
                    {isEditOpen && (
                        <FlashCardEditPopUp
                            navigateToPath={"/my_decks"}
                            frontText={popupEditFrontText}
                            backText={popupEditBackText}
                            onSaveChanges={handleSaveChanges}
                            onDeleteCard={handleDeleteCard}
                            onClose={() => setIsEditOpen(false)}
                            flashcardId={popupEditFlashCardId}
                            numberOfFlashcards={numberOfFlashCards}
                        />
                    )}
                    <Options isDeckPublic={isDeckPublic} onShareDeck={handleShareDeck} onCloseBox={handleOpenOptions}
                             isOpen={isOpenOptions} onResetDeck={handleResetDeck}
                             onDeleteDeck={handleDeleteDeck}></Options>
                    <ButtonsContainerLearningMode onClickLearn={handleLearningMode}
                                                  onClickMemorized={handleMemorizedFlashcardsClick}
                                                  onClickNotMemorized={handleNotMemorizedFlashcardsClick}
                                                  onClickVoiceControl={handleLearnModeClick}
                                                  onClickOptions={handleOpenOptions}

                    />
                    <FlashCard
                        front_text={flashcards[currentBigCardIndex]['title']}
                        back_text={flashcards[currentBigCardIndex]['card text']}
                        left_corner_text={`${currentBigCardIndex + 1}/${numberOfFlashCards} ${deckTitle}`}
                        icon={isSpeakingBigCard && isSpeaking ? speaker_blue : speaker}
                        isRotated={isRotated}
                        onIconClick={() => handleSpeakerBigCardClick()}
                    />
                    <ButtonsContainer
                        onClickPrev={handlePrevClick}
                        onClickNext={handleNextClick}
                        onClickRotate={handleRotateClick}
                        onClickBackToDecks={handleBackToDecks}
                    />
                    <p className={"all-flashcards-text"}>All Flashcards</p>
                    {flashcards.map((flashcard, index) => (

                        <FlashCardField
                            icon_pencil={pencil}
                            onClickPencil={() => handleOpenPopup(flashcard['title'], flashcard['card text'], flashcard['id'])}
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
export default FlashCardsContainer;