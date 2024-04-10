import React, {useState, useRef, useEffect} from "react";
import {FormControl, InputAdornment, IconButton} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ButtonFlashCardsCreatePage from "./ButtonCreateFlashCardPage";
import trashbin from "../../assets/Trashbin.png";
import plus from "../../assets/Plus.png";
import microphone_black from "../../assets/Microphone_black.png";
import microphone_red from "../../assets/Microphone_red.png";
import "../../styles/create_flash_cards_page/flash_card_style.scss";

const FlashCardCreator = (props) => {
    const [directorsArray, setDirectorsArray] = useState([{id: 0, value: ""}]);
    const textFieldRefs = useRef([null]);
    const [texts, setTexts] = useState({});
    const [isDictating, setIsDictating] = useState({});
    const recognitionInstances = useRef({});

    const recognition = useRef(null);

    useEffect(() => {
        if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
            recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.current.lang = 'en-US';
            recognition.current.continuous = true;
            recognition.current.onresult = (event) => {
                let finalTranscript = "";
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript + " ";
                    }
                }
                setTexts(prevTexts => ({
                    ...prevTexts,
                    [event.target.id]: (prevTexts[event.target.id] || '') + finalTranscript
                }));
            };
        } else {
            alert("Twoja przeglądarka nie obsługuje Speech Recognition API.");
        }
    }, []);

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
            const recognitionForCard = recognitionInstances.current[recognitionInstanceKey] || new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognitionForCard.lang = 'en-US';
            recognitionForCard.continuous = true;
            recognitionForCard.onresult = (event) => {
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


    const removeDirector = (idToRemove) => {
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

    useEffect(() => {
        const addedNewDirector = directorsArray.length > textFieldRefs.current.length;
        if (
            addedNewDirector &&
            textFieldRefs.current[textFieldRefs.current.length - 1]
        ) {
            textFieldRefs.current[textFieldRefs.current.length - 1].scrollIntoView({
                behavior: "smooth",
                inline: "nearest",
            });
        }
    }, [directorsArray, textFieldRefs]);

    return (
        <div className="texfields-container">
            <div className="webTitle"><p>Create Deck</p></div>
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
                                inputRef={el => textFieldRefs.current[index] = el}
                                value={texts[`front-${id}`] || ''}
                                onInput={(e) => setTexts(prevTexts => ({
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
                                inputRef={el => textFieldRefs.current[index] = el}
                                value={texts[`back-${id}`] || ''}
                                onInput={(e) => setTexts(prevTexts => ({...prevTexts, [`back-${id}`]: e.target.value}))}
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
                        <ButtonFlashCardsCreatePage imageSize={"30px"} text={"Remove Card"} image={trashbin}
                                                    color={"#DF0A0A"} onClick={() => removeDirector(id)}/>
                    </Grid>
                </Grid>
            ))}
            <Grid container justify="center" alignItems="center">
                <ButtonFlashCardsCreatePage imageSize={"30px"} text={"Add Card"} image={plus} color={"#08C10A"}
                                            onClick={appendInputDirector}/>
            </Grid>
        </div>
    );
};

export default FlashCardCreator;