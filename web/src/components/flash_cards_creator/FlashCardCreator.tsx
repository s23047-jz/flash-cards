import React, {useState, useRef, useEffect} from "react";
import {
    FormControl,
    InputAdornment,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ButtonFlashCardsCreatePage from "./ButtonCreateFlashCardPage";
// @ts-ignore
import GenerateContentChatPopUpBox from "./GenerateContebtChatPopUpBox";
import Alert from '../alert/Alert'
// @ts-ignore
import trashbin from "../../assets/Trashbin.png";
// @ts-ignore
import plus from "../../assets/Plus.png";

// @ts-ignore
import generate_text from '../../assets/Generate_text.png';
// @ts-ignore
import {DeckService} from "../../services/decs" ;
// @ts-ignore
import "../../styles/create_flash_cards_page/flash_card_style.scss";
import {ActiveUser} from "../../services/user";
import LoadingSpinner from "../loading_spinner/LoadingSpinner";
// @ts-ignore
import LoadingSpinnerChat from "../loading_spinner/LoadingSpinnerChat";
import {ChatService} from "../../services/chat";
// @ts-ignore
const FlashCardCreator = (props) => {
    const [category, setCategory] = useState('');
    const [deckTitle, setDeckTitle] = useState('');
    const [directorsArray, setDirectorsArray] = useState([{id: 0, value: ""}]);
    const textFieldRefs = useRef([null]);
    const [texts, setTexts] = useState<Record<string, any>>({});
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [boxOpen, setboxOpen] = useState(false);
    const [boxContent, setboxContent] = useState("");
    const [isChatGenerating, setIsChatGenerating] = useState(false);


    useEffect(() => {


        const timeout = setTimeout(() => {

            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);


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
            setAlertMessage('The "deck name" and "deck category" fields must be completed.');
            setShowAlert(true);
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
            setAlertMessage('You must add at least one non-empty flashcard before creating your deck.');
            setShowAlert(true);
            return;
        }

        const deck_body = {
            user_id: userId,
            title: deckTitle,
            deck_category: category,
        };


        try {
            const createdDeck = await DeckService.create_deck(deck_body);
            let flashcards = []
            for (const {id} of directorsArray) {
                const frontSideText = texts[`front-${id}`] || '';
                const backSideText = texts[`back-${id}`] || '';
                if (frontSideText.length >= 1 && backSideText.length >= 1) {
                    const flash_card_body = {
                        deck_id: createdDeck?.data.id,
                        card_title: frontSideText,
                        card_text: backSideText,
                        is_memorized: false
                    };
                    flashcards.push(flash_card_body)
                    // await DeckService.create_flash_card(flash_card_body);
                }


            }
            await DeckService.create_multiple_flashcard(flashcards)

            setDeckTitle('');
            setCategory('');
            setTexts({});
            setShowAlert(true);
            setAlertMessage('The deck has been successfully created!');

        } catch (error: any) {
            setAlertMessage("Creating Deck Failed: " + error.message);
            setShowAlert(true);
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    const handleGenerateText = async (id: number) => {
        const frontSideText = texts[`front-${id}`] || '';
        if (frontSideText.length > 2) {
            setIsChatGenerating(true);
            try {
                let chat_answer = await ChatService.sent_message(frontSideText)
                const maxLength = 511;
                const sliced_message = chat_answer.slice(0, maxLength);
                setboxContent(sliced_message);
                setboxOpen(true);
            } catch (error) {
                console.error('Failed to generate text from chat:', error);
                setAlertMessage('Failed to generate text from chat.');
                setShowAlert(true);
            } finally {
                setIsChatGenerating(false);
            }
        } else {
            setAlertMessage('Front side cannot be empty.');
            setShowAlert(true);
        }
    };

    const handleRejectChatContent = () => {
        setboxOpen(false);
    };

    const handleAcceptChatContent = (id: number) => {
        setTexts(prevTexts => ({
            ...prevTexts,
            [`back-${id}`]: boxContent
        }));
        setboxOpen(false);


    };

    return (

        isLoading ? (
            <LoadingSpinner/>
        ) : (
            <>
                <div className="texfields-container">
                    {isChatGenerating ? <LoadingSpinnerChat/> : null}
                    <Grid container justify="center" alignItems="center">
                        <div className="webTitle"><p>Create Deck</p></div>
                        <ButtonFlashCardsCreatePage text={"Create Deck"} image={plus} color={"#5346F1"}
                                                    border={'2px solid black'}
                                                    onClick={handleDeck}/>
                        {showAlert && <Alert message={alertMessage} onClose={handleCloseAlert}/>}
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
                                    onChange={(e) => setDeckTitle(e.target.value)}
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
                                    onChange={(e) => setCategory(e.target.value)}
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
                                        onInput={(e: any) => setTexts(prevTexts => ({
                                            ...prevTexts,
                                            [`front-${id}`]: e.target.value
                                        }))}
                                        InputProps={{
                                            classes: {input: props.classes.flashCardTextField},
                                            endAdornment: (
                                                <InputAdornment position="start"
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '14%',
                                                                    right: '0.1%'
                                                                }}>
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

                                        onInput={(e: any) => setTexts(prevTexts => ({
                                            ...prevTexts,
                                            [`back-${id}`]: e.target.value
                                        }))}
                                        InputProps={{
                                            classes: {input: props.classes.flashCardTextField},
                                            endAdornment: (
                                                <InputAdornment position="start"
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '14%',
                                                                    right: '0.1%'
                                                                }}>
                                                </InputAdornment>
                                            )
                                        }}
                                        inputProps={{maxLength: 512}}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid container justifyContent="center">
                                <Grid xs={12} lg={6} item style={{
                                    marginBottom: "25px",
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    <ButtonFlashCardsCreatePage text={"Remove Card"} image={trashbin}
                                                                border={'2px solid black'} color={"#DF0A0A"}
                                                                onClick={() => removeDirector(id)}/>
                                </Grid>
                                <Grid xs={12} lg={6} item style={{
                                    marginBottom: "25px",
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    <ButtonFlashCardsCreatePage text={"Generate text"} image={generate_text}
                                                                border={'2px solid black'} color={"#0431b8"}
                                                                onClick={() => handleGenerateText(id)}/>
                                </Grid>
                            </Grid>
                            <GenerateContentChatPopUpBox acceptContent={() => handleAcceptChatContent(id)}
                                                         rejectContent={handleRejectChatContent} boxOpen={boxOpen}
                                                         boxContent={boxContent} id={id}/>

                        </Grid>

                    ))}
                    <Grid container justify="center" alignItems="center">
                        <ButtonFlashCardsCreatePage text={"Add Card"} image={plus} color={"#08C10A"}
                                                    border={'2px solid black'}
                                                    onClick={appendInputDirector}/>
                    </Grid>

                </div>
            </>
        )
    );
};

export default FlashCardCreator;