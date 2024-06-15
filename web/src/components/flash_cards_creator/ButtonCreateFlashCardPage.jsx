import React from "react";
import Button from "@mui/material/Button";
import "../../styles/create_flash_cards_page/remove_flash_card_button.scss"

const ButtonFlashCardsCreatePage = ({image, onClick, text, color, border}) => {
    const buttonStyle = {
        backgroundColor: color,
        border: border,
    };

    return (
        <Button variant="contained" onClick={onClick} style={buttonStyle}>
            {text} <img src={image} alt="icon"/>
        </Button>
    );
};

export default ButtonFlashCardsCreatePage;