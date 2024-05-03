// @ts-ignore
import speaker from '../../assets/Speaker.png';
// @ts-ignore
import speaker_blue from '../../assets/Speaker_blue.png';
// @ts-ignore
import React, {useEffect, useRef, useState} from "react";
import FlashCardVoiceMode from "./FlashCardVoiceMode";
import {DeckService} from '../../services/decs';
// @ts-ignore
import ButtonsContainerVoiceMode from "./ButtonsContainerVoiceMode";
import LoadingSpinner from "../loading_spinner/LoadingSpinner";
import "../../styles/voice_control_page/cards_buttons_container.scss"
import {useNavigate} from 'react-router-dom';

const CardsButtonsContainer = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentBigCardIndex, setCurrentBigCardIndex] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [isSpeakingBigCard, setIsSpeakingBigCard] = useState(false);
    const [deckTitle, setDeckTitle] = useState(false);
    const [textControl, setTextControl] = useState('');
    const numberOfFlashCards = flashcards.length
    const recognition = useRef(null);


    useEffect(() => {


        if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
            // @ts-ignore
            recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            // @ts-ignore
            recognition.current.lang = 'en-US';
            // @ts-ignore
            recognition.current.continuous = true;

            // @ts-ignore
            recognition.current.onresult = (event) => {
                let finalTranscriptText = " ";
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscriptText += event.results[i][0].transcript + " ";
                    }
                }
                if (isSpeakingBigCard) {
                    finalTranscriptText = ''
                    setTextControl(finalTranscriptText)
                } else {
                    const trimmedText = finalTranscriptText.trim();
                    setTextControl(trimmedText)
                }

            };


            // @ts-ignore
            recognition.current.start();
        } else {
            alert("Your browser does not support the Speech Recognition API.");
        }

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

    useEffect(() => {
        voiceControl(textControl);
    }, [textControl]);


    const handleSpeak = (text_front: string, text_back: string) => {
        if ('speechSynthesis' in window) {
            const text: string = text_front + "." + text_back
            const sentences = text.split('.');

            sentences.forEach((sentence, i) => {
                const speech = new SpeechSynthesisUtterance(sentence.trim());
                speech.lang = 'en-US';
                speech.rate = 0.8;
                speech.pitch = 1.2;
                speech.volume = 1.0;

                speech.onstart = () => {
                    setIsSpeaking(true);
                };

                if (i === sentences.length - 1) {
                    speech.onend = () => {
                        setIsSpeaking(false);
                    };
                }
                window.speechSynthesis.speak(speech);
            });

        } else {
            console.log('Speech synthesis not supported.');
        }
    };

    const handleSpeakerBigCardClick = () => {
        setIsSpeakingBigCard(true)
        let currentBigFlashCard = flashcards[currentBigCardIndex];
        if (!isRotated) {
            handleSpeak(currentBigFlashCard['title'], '');
        } else {
            handleSpeak(currentBigFlashCard['card text'], '');
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
        console.log(currentBigCardIndex)
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
        window.speechSynthesis.cancel();
        setIsRotated(!isRotated);
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    const voiceControl = (text: string) => {

        const commands = ['previous', 'next', 'spin', 'read', 'quiet',]

        if (text.length > 3) {
            switch (text) {
                case commands[0]: {
                    console.log('prev click');
                    handlePrevClick()
                    setTextControl('')
                    break;
                }
                case commands[1]: {
                    console.log('next click');
                    handleNextClick()
                    setTextControl('')
                    break;
                }
                case commands[2]: {
                    console.log('rotate');
                    handleRotateClick()
                    setTextControl('')
                    break;
                }
                case commands[3]: {
                    console.log('reading');
                    //handleSpeak(flashcards[0]['title'], '');
                    setTextControl('')
                    break;
                }
                case commands[4]: {
                    console.log('quiet command 4');
                    handleSpeakerBigCardClick()
                    setTextControl('');
                    break;
                }
                default: {
                    console.log('not found command');
                    setTextControl('');
                    break;
                }
            }
        }
    }

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
                        icon={isSpeakingBigCard && isSpeaking ? speaker_blue : speaker}
                        isRotated={isRotated}
                        onIconClick={handleSpeakerBigCardClick}
                    />
                    <ButtonsContainerVoiceMode
                        onClickPrev={handlePrevClick}
                        onClickNext={handleNextClick}
                        onClickRotate={handleRotateClick}
                        onClickStopControl={()=>console.log('text')}
                    />

                </>

            )}
        </div>
    );
};

export default CardsButtonsContainer;