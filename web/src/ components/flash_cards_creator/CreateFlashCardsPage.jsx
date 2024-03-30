import React from 'react';
import DrawerAppBar from "../home_page/NavBar";
import FlashCard from "./FlaschCardCreator";
import '../../styles/create_flash_cards_page/flash_card_page_style.scss';
import {withStyles} from "@material-ui/core/styles";
const styles = {
    flashCardCategoryName: {
        paddingRight: '50px',
        paddingLeft: '2px',
        lineHeight: '2',
        letterSpacing: '0.4px',
        zIndex: '10',
        height: '6vh',
        fontSize: "24px",
        fontWeight: "bold",
        textAlign: 'center',

    },
    flashCardTextField: {
        paddingRight: '50px',
        paddingLeft: '2px',
        lineHeight: '1',
        letterSpacing: '0.4px',
        zIndex: '10',
        height: '20vh',
        fontSize: "15px",
        fontWeight: "bold",
    }
};

const StyledFlashCards = withStyles(styles)(FlashCard);
const CreateFlashCardsPage = () => {

    return (
        <>
            <nav>
                <DrawerAppBar/>

            </nav>
            <main className="main-container">
                <div className="flex-container">
                    <StyledFlashCards/>
                </div>
            </main>
        </>
    );
};


export default CreateFlashCardsPage;