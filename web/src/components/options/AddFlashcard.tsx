import React, {useState} from 'react';
import '../../styles/flash_cards/flash_card_pop_up.scss';
import {DeckService} from "../../services/decs";
import {ChatService} from "../../services/chat";
import GenerateContentChatPopUpBox from "../flash_cards_creator/GenerateContebtChatPopUpBox";
import LoadingSpinnerChat from "../loading_spinner/LoadingSpinnerChat";
import Alert from "../alert/Alert";

// @ts-ignore
const AddFlashcard = ({onClose,}) => {
    const [frontText, setFrontText] = useState('');
    const [backText, setBackText] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [isChatGenerating, setIsChatGenerating] = useState(false);
    const [boxOpen, setboxOpen] = useState(false);
    const [boxContent, setboxContent] = useState("");
    // @ts-ignore
    const handleFrontText = (e) => {
        setFrontText(e.target.value);
    };
    // @ts-ignore
    const handleBackText = (e) => {
        setBackText(e.target.value);
    };

    const handleRejectChatContent = () => {
        setboxOpen(false);
    };

    const handleAcceptChatContent = (id: number) => {
        setBackText(boxContent)
        setboxOpen(false);
    };

    const handleSaveCard = () => {
        if (backText.length < 1 && frontText.length < 1) {
            setFrontText('Front text must be at least 1 characters long.');
            setBackText('Back text must be at least 1 characters long.');
            return;
        } else if (frontText.length < 1) {
            setFrontText('Front text must be at least 1 characters long.');
            return;
        } else if (backText.length < 1) {
            setBackText('Back text must be at least 1 characters long.');
            return;
        }
        const deckDataString = localStorage.getItem("deckData");
        // @ts-ignore
        const deckData = JSON.parse(deckDataString);
        const deck_id = deckData.id;
        const flashcard_body = {
            deck_id: deck_id,
            card_title: frontText,
            card_text: backText,
            is_memorized: false
        }

        DeckService.create_flash_card(flashcard_body)
        window.location.reload();
    }
    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleGenerateText = async () => {
        setShowAlert(false)
        if (frontText.length > 1) {
            setIsChatGenerating(true);
            try {
                let chat_answer = await ChatService.sent_message(frontText)
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


    return (
        <div className="popup-options">
            <textarea
                value={frontText}
                onChange={handleFrontText}
                placeholder="Front Side"
                maxLength={255}
            />
            <textarea
                value={backText}
                onChange={handleBackText}
                placeholder="Back Side"
                maxLength={511}
            />
            <div className="button-container">
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleSaveCard}>Add Flashcard</button>
                <button onClick={handleGenerateText}>Generate text</button>
                {isChatGenerating ? <LoadingSpinnerChat/> : null}


            </div>
            {showAlert && <Alert message={alertMessage} onClose={handleCloseAlert}/>}
            <GenerateContentChatPopUpBox acceptContent={() => handleAcceptChatContent(0)}
                                         rejectContent={handleRejectChatContent} boxOpen={boxOpen}
                                         boxContent={boxContent} id={0}/>
        </div>
    );
};

export default AddFlashcard;