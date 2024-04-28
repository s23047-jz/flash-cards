import React, {useState, useRef, useEffect} from "react";
// @ts-ignore
import {FormControl, InputAdornment, IconButton} from "@material-ui/core";
// @ts-ignore
import TextField from "@material-ui/core/TextField";
// @ts-ignore
import Grid from "@material-ui/core/Grid";
import ButtonFlashCardsCreatePage from "./ButtonCreateFlashCardPage";
// @ts-ignore
import trashbin from "../../assets/Trashbin.png";
// @ts-ignore
import plus from "../../assets/Plus.png";
// @ts-ignore
import microphone_black from "../../assets/Microphone_black.png";
// @ts-ignore
import microphone_red from "../../assets/Microphone_red.png";
import {DeckService} from "../../services/decs" ;
// @ts-ignore
import "../../styles/create_flash_cards_page/flash_card_style.scss";
import {AuthService} from "../../services/auth";
import {ActiveUser} from "../../services/user";

// @ts-ignore
const FlashCardCreator = (props) => {
    const [category, setCategory] = useState('');
    const [deckTitle, setDeckTitle] = useState('');
    const [directorsArray, setDirectorsArray] = useState([{id: 0, value: ""}]);
    const textFieldRefs = useRef([null]);
    const [texts, setTexts] = useState<Record<string, any>>({});
    const [isDictating, setIsDictating] = useState<Record<string, boolean>>({});
    const recognitionInstances = useRef<{ [key: string]: any }>({});


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
                let finalTranscript = "";
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript + " ";
                    }
                }
                setTexts(prevTexts => ({
                    ...prevTexts,
                    // @ts-ignore
                    [event.target.id]: (prevTexts[event.target.id] || '') + finalTranscript
                }));
            };
        } else {
            alert("Twoja przeglądarka nie obsługuje Speech Recognition API.");
        }
    }, []);

    // @ts-ignore
    const toggleDictation = (id, isFrontSide) => {
        const recognitionInstanceKey = `${isFrontSide ? 'front-' : 'back-'}${id}`;
        const recognitionInstance = recognitionInstances.current[recognitionInstanceKey];

        if (isDictating[recognitionInstanceKey]) {
            recognitionInstance.stop();
            setIsDictating(prevState => ({
                ...prevState,
                [recognitionInstanceKey]: false
            }));
        } else {
            const recognitionForCard = recognitionInstances.current[recognitionInstanceKey] || new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)();
            recognitionForCard.lang = 'en-US';
            recognitionForCard.continuous = true;
            recognitionForCard.onresult = (event: any) => {
                let finalTranscript = "";
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript + " ";
                    }
                }
                setTexts(prevTexts => ({
                    ...prevTexts,
                    [`${isFrontSide ? 'front-' : 'back-'}${id}`]: (prevTexts[`${isFrontSide ? 'front-' : 'back-'}${id}`] || '') + finalTranscript
                }));
            };
            recognitionForCard.onend = () => {
                setIsDictating(prevState => ({
                    ...prevState,
                    [recognitionInstanceKey]: false
                }));
            };
            recognitionForCard.start();

            recognitionInstances.current[recognitionInstanceKey] = recognitionForCard;

            setIsDictating(prevState => ({
                ...prevState,
                [recognitionInstanceKey]: true
            }));
        }
    };

    const appendInputDirector = () => {
        const maxId = directorsArray.length > 0 ? Math.max(...directorsArray.map(item => item.id)) : 0;
        const newInput = {id: maxId + 1, value: ""};
        setDirectorsArray(prevArray => [...prevArray, newInput]);
        textFieldRefs.current.push(null);
        setTexts(prevTexts => ({
            ...prevTexts,
            [maxId + 1]: ''
        }));
    };


    const removeDirector = (idToRemove: any) => {
        setDirectorsArray(prevArray =>
            prevArray.filter(item => item.id !== idToRemove)
        );
        textFieldRefs.current = textFieldRefs.current.filter((_, index) => {
            if (index < directorsArray.length) {
                return directorsArray[index].id !== idToRemove;
            }
            return false;
        });
        setTexts(prevTexts => {
            const newTexts = {...prevTexts};
            delete newTexts[`front-${idToRemove}`];
            delete newTexts[`back-${idToRemove}`];
            return newTexts;
        });
    };

    const handleDeck = async () => {
        const userId = ActiveUser.getId();

        if (!deckTitle || !category) {
            alert('The "deck name" and "deck category" fields must be completed.');
            return;
        }

        let hasNonEmptyCards = false;

        for (const {id} of directorsArray) {
            const frontSideText = texts[`front-${id}`] || '';
            const backSideText = texts[`back-${id}`] || '';
            if (frontSideText.trim() !== '' && backSideText.trim() !== '') {
                hasNonEmptyCards = true;
                break;
            }
        }

        if (!hasNonEmptyCards) {
            alert('You must add at least one non-empty card before creating the deck.');
            return;
        }

        const deck_body = {
            user_id: userId,
            title: deckTitle,
            deck_category: category,
        };




        try {
            const createdDeck = await DeckService.create_deck(deck_body);

            for (const {id} of directorsArray) {
                const frontSideText = texts[`front-${id}`] || '';
                const backSideText = texts[`back-${id}`] || '';
                if (frontSideText.length > 1 && backSideText.length > 1) {
                    const flash_card_body = {
                        deck_id: createdDeck?.data.id,
                        card_title: frontSideText,
                        card_text: backSideText,
                    };

                    await DeckService.create_flash_card(flash_card_body);
                }

            }

        } catch (error: any) {
            alert("Failed to create deck and flash cards: " + error.message);
        }
    };
//     useEffect(() => {
//     const addedNewDirector = directorsArray.length > textFieldRefs.current.length;
//     if (
//         addedNewDirector &&
//         textFieldRefs.current.length > 0 &&
//         textFieldRefs.current[textFieldRefs.current.length - 1]
//     ) {
//         textFieldRefs.current[textFieldRefs.current.length - 1].scrollIntoView({
//             behavior: "smooth",
//             inline: "nearest",
//         });
//     }
// }, [directorsArray, textFieldRefs]);


    return (
        <div className="texfields-container">

            <Grid container justify="center" alignItems="center">
                <div className="webTitle"><p>Create Deck</p></div>
                <ButtonFlashCardsCreatePage text={"Create Deck"} image={plus} color={"#5346F1"} border={'2px solid black'}
                                            onClick={handleDeck}/>
            </Grid>
            <Grid container spacing={1} style={{marginBottom: "3%"}}>
                <Grid xs={12} lg={6} item>
                    <FormControl fullWidth margin="dense">
                        <TextField
                            className="TextFieldDeckNameCategory"
                            variant="outlined"
                            required
                            type="text"
                            id={`Deck-name`}
                            label="deck name"
                            name={`Deck-name`}
                            multiline={true}
                            value={deckTitle}
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDeckTitle(e.target.value)}
                            rows={1}
                            InputProps={{
                                classes: {input: props.classes.flashCardCategoryName},
                            }}
                            inputProps={{maxLength: 30}}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={12} lg={6} item>
                    <FormControl fullWidth margin="dense">
                        <TextField
                            className="TextFieldDeckNameCategory"
                            variant="outlined"
                            required
                            type="text"
                            id={`Deck-category`}
                            label="deck category"
                            name={`Deck-name`}
                            multiline={true}
                            rows={1}
                            value={category}
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setCategory(e.target.value)}
                            InputProps={{
                                classes: {input: props.classes.flashCardCategoryName},
                            }}
                            inputProps={{maxLength: 30}}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            {directorsArray.map(({id}, index) => (
                <Grid container spacing={1} item key={id}>
                    <Grid xs={12} lg={6} item>
                        <FormControl fullWidth margin="dense">
                            <TextField
                                className="TextFieldStyle"
                                variant="outlined"
                                required
                                type="text"
                                id={`front-side-${id}`}
                                label="front side"
                                name={`front-side-${id}`}
                                multiline={true}
                                rows={1}
                                inputRef={(el: null) => textFieldRefs.current[index] = el}
                                value={texts[`front-${id}`] || ''}
                                onInput={(e: any) => setTexts(prevTexts => ({
                                    ...prevTexts,
                                    [`front-${id}`]: e.target.value
                                }))}
                                InputProps={{
                                    classes: {input: props.classes.flashCardTextField},
                                    endAdornment: (
                                        <InputAdornment position="start"
                                                        style={{position: 'absolute', top: '14%', right: '0.1%'}}>
                                            <IconButton onClick={() => toggleDictation(id, true)}>
                                                <img
                                                    src={isDictating[`front-${id}`] ? microphone_red : microphone_black}
                                                    alt="microphone icon"
                                                    style={{width: "30px", height: "30px", zIndex: 1}}/>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                inputProps={{maxLength: 256}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={6} item>
                        <FormControl fullWidth margin="dense">
                            <TextField
                                className="TextFieldStyle"
                                variant="outlined"
                                required
                                type="text"
                                id={`back-side-${id}`}
                                label="back side"
                                name={`back-side-${id}`}
                                multiline={true}
                                rows={1}
                                inputRef={(el: null) => textFieldRefs.current[index] = el}
                                value={texts[`back-${id}`] || ''}

                                onInput={(e: any) => setTexts(prevTexts => ({
                                    ...prevTexts,
                                    [`back-${id}`]: e.target.value
                                }))}
                                InputProps={{
                                    classes: {input: props.classes.flashCardTextField},
                                    endAdornment: (
                                        <InputAdornment position="start"
                                                        style={{position: 'absolute', top: '14%', right: '0.1%'}}>
                                            <IconButton onClick={() => toggleDictation(id, false)}>

                                                <img src={isDictating[`back-${id}`] ? microphone_red : microphone_black}
                                                     alt="microphone icon"
                                                     style={{width: "30px", height: "30px", zIndex: 1}}/>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                inputProps={{maxLength: 512}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={6} item style={{marginBottom: "25px"}}>

                        <ButtonFlashCardsCreatePage text={"Remove Card"} image={trashbin} border={'2px solid black'}
                                                    color={"#DF0A0A"} onClick={() => removeDirector(id)}/>
                    </Grid>
                </Grid>
            ))}
            <Grid container justify="center" alignItems="center">
                <ButtonFlashCardsCreatePage text={"Add Card"} image={plus} color={"#08C10A"} border={'2px solid black'}
                                            onClick={appendInputDirector}/>
            </Grid>
        </div>
    );
};

export default FlashCardCreator;