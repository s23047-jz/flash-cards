import React from "react";
import Button from "@mui/material/Button";
import "../../styles/all_flash_cards_page/button_learning_mode.scss"
// @ts-ignore
const ButtonFlashCardsCreatePage = ({image, text, onClick, color, border}) => {
    const buttonStyle = {
    backgroundColor: color,
    border: border,
  };

  return (
    <Button className={"button-learning-mode"} variant="contained"  onClick={onClick} style={buttonStyle}>
        <p className={'button-text'}>{text}</p> <img className={'icon-learning-mode'} src={image} alt="icon" />
    </Button>
  );
};

export default ButtonFlashCardsCreatePage;