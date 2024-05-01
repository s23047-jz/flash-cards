// @ts-ignore
import speaker from '../../assets/Speaker.png';
// @ts-ignore
import speaker_blue from '../../assets/Speaker_blue.png';
// @ts-ignore
import React, {useEffect, useState} from "react";
import FlashCard from "./FlashCard";
import FlashCardField from "./FlashCardField";
import {DeckService} from '../../services/decs';
import "../../styles/flash_cards/flash_cards_container.scss"

const FlashCardsContainer = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentCardIndex, setCurrentCardIndex] = useState(-1);
    useEffect(() => {
        const fetchFlashCards = async () => {
            try {
                let deck_id: string;

                const intervalId = setInterval(() => {
                    const deckDataString = localStorage.getItem("deckData");
                    const deckData = JSON.parse(deckDataString || "{}");
                    deck_id = deckData.id;

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
            const sentences = text.split('.'); // Podziel tekst na zdania

            sentences.forEach((sentence, i) => {
                const speech = new SpeechSynthesisUtterance(sentence.trim());
                speech.lang = 'en-US';
                speech.rate = 0.8; // Możesz dostosować szybkość odczytywania
                speech.pitch = 1.2;
                speech.volume = 1.0;

                speech.onstart = () => {
                    setCurrentCardIndex(index);
                };

                if (i === sentences.length - 1) {
                    speech.onend = () => {
                        setCurrentCardIndex(-1);
                    };
                }

                window.speechSynthesis.speak(speech);
            });
        } else {
            console.log('Speech synthesis not supported.');
        }

    };

    // const handleVoiceCommand = () => {
    //     const recognition = new (window as any).webkitSpeechRecognition();
    //     recognition.lang = 'en-US';
    //     recognition.onresult = (event: any) => {
    //         const command = event.results[0][0].transcript.toLowerCase();
    //         if (command == 'read') {
    //             handleSpeak(flashcards[1]['title'], flashcards[1]['card text'], 1);
    //         }
    //     };
    //     recognition.start();
    // };

    return (
        <div className={"all-flashcards-container"}>
            <FlashCard front_text={"text front"} back_text={"back text"} icon={speaker}/>
            <p className={"all-flashcards-text"}>All Flashcards</p>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                flashcards.map((flashcard, index) => (
                    <FlashCardField
                        key={index}
                        front_text={`${flashcard['title']}`}
                        back_text={flashcard['card text']}
                        icon={currentCardIndex === index ? speaker_blue : speaker}
                        onClick={() => handleSpeak(flashcard['title'], flashcard['card text'], index)}
                    />
                ))
            )}
        </div>

    );
};

export default FlashCardsContainer;