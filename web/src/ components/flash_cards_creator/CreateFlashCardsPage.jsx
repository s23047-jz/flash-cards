import React from 'react';
// @ts-ignore
import {withStyles} from "@material-ui/core/styles";
import '../styles/create_flash_cards_page/flash_card_page_style.scss';
import DrawerAppBar from "../components/home_page/NavBar";
import FlashCard from "../components/flash_cards_creator/FlaschCardCreator";



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

// @ts-ignore
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