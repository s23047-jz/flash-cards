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
import {NlpService} from "../../services/nlp";
import {useNavigate} from 'react-router-dom';

const CardsButtonsContainer = () => {
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
    const numberOfFlashCards = flashcards.length
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
                // const commands = `['previous', 'next', 'twist', 'reading', 'quiet','rotate card and read text',
                // 'go next and read front text', 'go next and read back text',
                // 'back/previous and read front text', 'back/previous and read back text']`;
                // const chat_question = `[${commands}]
                //     I have the commands mapped and I have the sentence ${trimmedText},
                //     which of these commands suits you best semantically compare to text?
                //     Return the index number, starting from zero. It does not expand,
                //     I want the index number.`;
                //
                // console.log(trimmedText)
                // // console.log(chat_question)
                // if (trimmedText.length > 3){
                //     nlpModelControl(trimmedText)
                // }


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
        console.log(flashcards)
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
        console.log("active speach")
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = 'en-GB';
            speech.rate = 0.9;
            speech.pitch = 1.2;
            speech.volume = 1.0;
            console.log("handle text:", text)
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
        console.log(isRotated)
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


    const voiceControl = (text: string) => {


        const command = {
            "previous": 0,
            "next": 1,
            "rotate":2,
            'read': 3,
            'next/read': 6
        }
        // @ts-ignore
        let number = command[text]
        console.log("NUMBERRRRRRRRRRRRRRRRRRRRRR", number, text)
        console.log("isSpeakingBigCard): ", isSpeakingBigCard)
        if (!isSpeakingBigCard) {
            switch (number) {
                case 0:
                    handlePrevClick();
                    break;
                case 1:
                    handleNextClick();
                    break;
                case 2:
                    console.log("rotate voice:", isRotated)
                    handleRotateClick();
                    console.log("rotate voice:", isRotated)
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

     const navigatePrevSide = () => {
        navigate('/my_deck_learning_modes')
    }
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
                    <FlashCardVoiceMode
                        front_text={flashcards[currentBigCardIndex]['title']}
                        back_text={flashcards[currentBigCardIndex]['card text']}
                        left_corner_text={`${currentBigCardIndex + 1}/${numberOfFlashCards} ${deckTitle}`}
                        icon={isSpeakingBigCard ? speaker_blue : speaker}
                        isRotated={isRotated}
                        onIconClick={handleSpeakerBigCardClick}
                        isMicrophoneListening={isListening}
                    />
                    <ButtonsContainerVoiceMode
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

export default CardsButtonsContainer;