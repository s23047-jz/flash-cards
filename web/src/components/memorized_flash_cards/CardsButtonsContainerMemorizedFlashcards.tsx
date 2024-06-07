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
import "../../styles/not_memorized_flash_cards/cards_buttons_container_not_memorized.scss"
import {ChatService} from "../../services/chat";
import ButtonContainerNotMemorizedFlashcards from "../not_memorized_flashcards/ButtonContainerNotMemorizedFlashcards";
import ButtonNotMemorizedFlashCards from "../not_memorized_flashcards/ButtonNotMemorizedFlashCards";
import {useNavigate} from 'react-router-dom';
import {NlpService} from "../../services/nlp";
const CardsButtonsContainerMemorizedFlashcards = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentBigCardIndex, setCurrentBigCardIndex] = useState(0);
    const [isRotated, setIsRotated] = useState(false);
    const [isSpeakingBigCard, setIsSpeakingBigCard] = useState(false);
    const [deckTitle, setDeckTitle] = useState(false);
    const [textControl, setTextControl] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isClickVoiceControlAllowed, setIsClickVoiceControlAllowed] = useState(true);
    const [numberOfFlashCardsState, setNumberOfFlashCardsState] = useState(2);
    const numberOfFlashCards = flashcards.length;
    const recognition = useRef(null);
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
                            const response = await DeckService.get_memorized_flash_cards_from_deck(deck_id);
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

        if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
            // @ts-ignore
            recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            // @ts-ignore
            recognition.current.lang = 'en-GB';
            // @ts-ignore
            recognition.current.continuous = true;
            // @ts-ignore
            recognition.current.onresult = (event) => {


                let finalTranscriptText = "";
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscriptText += event.results[i][0].transcript + " ";
                    }
                }
                let trimmedText = finalTranscriptText.trim();
                setTextControl(isSpeakingBigCard ? '' : trimmedText);
                if (isSpeakingBigCard) {
                    trimmedText = ''
                }

            };

        } else {
            alert("Your browser does not support the Speech Recognition API.");
        }


    }, [isSpeakingBigCard, isRotated]);

     useEffect(() => {
        if (textControl.length > 0) {
            nlpModelControl(textControl);
        }
    }, [textControl]);

    useEffect(() => {
        if (isListening) {
            // @ts-ignore
            recognition.current.start();
        } else {
            // @ts-ignore
            recognition.current.stop();
        }
    }, [isListening, isSpeakingBigCard]);


    const handleStopControl = () => {

        if (isClickVoiceControlAllowed) {
            setIsClickVoiceControlAllowed(false)
            setTimeout(() => {
                setIsClickVoiceControlAllowed(true)
            }, 300);
            if (isListening) {
                setIsListening(false);
            } else {
                setIsListening(true);
            }
        }
    };

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
        console.log(flashcards, numberOfFlashCardsState)
        if (numberOfFlashCardsState >= 0) {
            let currentBigFlashCard = flashcards[currentBigCardIndex];
            if (!isRotated) {
                handleSpeak(currentBigFlashCard['title']);
                console.log("handle speak: flash card: ", currentBigFlashCard['title'])
            } else {
                handleSpeak(currentBigFlashCard['card text']);
            }
        }
        if (isSpeakingBigCard) {
            setIsSpeakingBigCard(false);
            window.speechSynthesis.cancel();
        }
    }

    const handleSpeakerNotRecognized = () => {
        setIsSpeakingBigCard(true);
        handleSpeak('command not recognized')
        if (isSpeakingBigCard) {
            setIsSpeakingBigCard(false);
            window.speechSynthesis.cancel();
        }
    }


    const handleNextClick = () => {
        window.speechSynthesis.cancel();
        setIsSpeakingBigCard(false);
        console.log(numberOfFlashCardsState)
        if (currentBigCardIndex < numberOfFlashCardsState ) {

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
        setIsRotated(!isRotated);
        console.log(isRotated)
        window.speechSynthesis.cancel();
        if (isSpeakingBigCard) {
            window.speechSynthesis.cancel();
            setIsSpeakingBigCard(false);
        }
    };

    const handleRotateRead = () => {
        handleRotateClick();
        handleNextRead();
    }
    const handleNextRead = () => {
        handleNextClick()
        handleSpeakerBigCardClick()
    }
    const handleNextRotateRead = () => {
        handleNextClick()
        handleRotateClick()
        handleSpeakerBigCardClick()
    }

    const handlePrevRead = () => {
        handlePrevClick()
        handleSpeakerBigCardClick()
    }
    const handlePrevRotateRead = () => {
        handlePrevClick()
        handleRotateClick()
        handleSpeakerBigCardClick()
    }

    const navigatePrevSide = () => {
        navigate('/my_deck_learning_modes')
    }


    const voiceControl = (text: string) => {
const command = {
            "previous": 0,
            "next": 1,
            "rotate":2,
            'read': 3,
            'stop': 4,
        }
        // @ts-ignore
        let number = command[text]
        if (!isSpeakingBigCard) {
            switch (number) {
                case 0:
                    handlePrevClick();
                    break;
                case 1:
                    handleNextClick();
                    break;
                case 2:
                    handleRotateClick();
                    break;
                case 3:
                    handleSpeakerBigCardClick();
                    break;
                case 4:
                    handleStopControl();
                    break;
                case 5:
                    handleRotateRead();
                    break;
                case 6:
                    handleNextRead();
                    break;
                case 7:
                    handleNextRotateRead();
                    break;
                case 8:
                    handlePrevRead();
                    break;
                case 9:
                    handlePrevRotateRead();
                    break;
                default:
                    handleSpeakerNotRecognized();
                    console.log('command not found');
                    break;
            }
        }
    };

    const nlpModelControl = async (text: string) => {
        try {
            let body = {
                text : text
            }

            const nlp_answer = await NlpService.sent_message(body)
            console.log("commnad", text)
            // @ts-ignore
            voiceControl(nlp_answer?.data);


        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className={"voice-control-container"}>
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
                            <ButtonContainerNotMemorizedFlashcards
                                onClickPrev={handlePrevClick}
                                onClickNext={handleNextClick}
                                onClickRotate={handleRotateClick}
                                onClickStopControl={handleStopControl}
                                onClickPrevSide={navigatePrevSide}
                                isMicrophoneListening={isListening}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default CardsButtonsContainerMemorizedFlashcards;