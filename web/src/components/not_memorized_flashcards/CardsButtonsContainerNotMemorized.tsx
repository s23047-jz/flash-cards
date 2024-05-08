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
import ButtonContainerNotMemorizedFlashcards from "./ButtonContainerNotMemorizedFlashcards";
import { useNavigate } from 'react-router-dom';
const CardsButtonsContainerNotMemorized = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentBigCardIndex, setCurrentBigCardIndex] = useState(0);
    const [isRotated, setIsRotated] = useState(false);
    const [isSpeakingBigCard, setIsSpeakingBigCard] = useState(false);
    const [deckTitle, setDeckTitle] = useState(false);
    const [textControl, setTextControl] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isClickVoiceControlAllowed, setIsClickVoiceControlAllowed] = useState(true);
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
                            const response = await DeckService.get_flash_cards_from_deck(deck_id);
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
                const commands = `['previous', 'next', 'twist', 'reading', 'quiet','rotate card and read text',
                'go next and read front text', 'go next and read back text',
                'back/previous and read front text', 'back/previous and read back text']`;
                const chat_question = `[${commands}]
                    I have the commands mapped and I have the sentence ${trimmedText},
                    which of these commands suits you best semantically compare to text?
                    Return the index number, starting from zero. It does not expand,
                    I want the index number.`;

                console.log(trimmedText)
                console.log(chat_question)
                chatControl(chat_question)


            };

        } else {
            alert("Your browser does not support the Speech Recognition API.");
        }


    }, [isSpeakingBigCard, currentBigCardIndex]);


    useEffect(() => {
        if (isListening) {
            // @ts-ignore
            recognition.current.start();
        } else {
            // @ts-ignore
            recognition.current.stop();
        }
    }, [isListening, isSpeakingBigCard, currentBigCardIndex]);


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

    const navigatePrevSide = () =>{
        navigate('/my_deck_learning_modes')
    }


    const voiceControl = (text: string) => {


        console.log(text)
        // @ts-ignore
        let number = parseInt(text.match(/\d+/)[0]);
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

    const chatControl = async (text: string) => {
        console.log(text)
        try {
            const chat_answer = await ChatService.sent_message(text);
            console.log("chat answer", chat_answer)
            // @ts-ignore
            voiceControl(chat_answer);
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
        </div>
    );
};

export default CardsButtonsContainerNotMemorized;