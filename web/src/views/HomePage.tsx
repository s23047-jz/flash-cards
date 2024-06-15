// @ts-ignore
import React from 'react';
import DrawerAppBar from "../components/home_page/NavBar";
// @ts-ignore
import logo from '../assets/images/logo.png';
import ButtonHomePage from '../components/home_page/ButtonHomePage ';
import '../styles/home_page/home_page_style.scss'
import {ActiveUser} from "../services/user";
// @ts-ignore
import Plus from "../assets/Plus.png";
// @ts-ignore
import YellowCard from "../assets/Yellow_cards.png";
// @ts-ignore
import RedCard from "../assets/Red_cards.png";
import {useNavigate} from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const createDeckPath = '/create_deck'
    const myDecksPath = '/my_decks'
    const publicDecksPath = '/public_decks'
    const navigateTo = (path: string) => {
        navigate(path)

    }

    ActiveUser.getUserData();
    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container">

                <div className="flex-container">
                    <div className="button-container">
                        <ButtonHomePage frontText={'Create New One'} image={Plus}
                                        onClick={() => navigateTo(createDeckPath)}
                                        backText={'Clicking the button will take you to the flashcard deck creator page.'}/>
                    </div>
                    <div className="button-container">
                        <ButtonHomePage frontText={'My Decks'} image={YellowCard}
                                        onClick={() => navigateTo(myDecksPath)}
                                        backText={'This is where your created decks are stored.'}/>
                    </div>
                    <div className="button-container">
                        <ButtonHomePage frontText={'Public Decks'} image={RedCard}
                                        onClick={() => navigateTo(publicDecksPath)}
                                        backText={'This is where your downloaded decks from other users are stored.'}/>
                    </div>
                </div>
            </main>
        </>
    );
};

export default HomePage;