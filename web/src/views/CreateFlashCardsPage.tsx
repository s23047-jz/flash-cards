import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import DrawerAppBar from "../components/home_page/NavBar";
import FlashCardCreator  from "../components/flash_cards_creator/FlashCardCreator";



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
const StyledFlashCards = withStyles(styles)(FlashCardCreator);

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