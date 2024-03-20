import React from 'react';
import DrawerAppBar from "./NavBar";
import logo from '../../assets/logo.png';
import ButtonHomePage from './ButtonHomePage ';
import '../../styles/home_page/home_page_style.scss'

const HomePage = () => {

    return (
        <>
            <nav>
                <DrawerAppBar/>
            </nav>
            <main className="main-container">
                <div className="flex-container">
                    <div className="button-container">
                        <ButtonHomePage frontText={'Create New One'} image={logo}
                                        backText={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}/>
                    </div>
                    <div className="button-container">
                        <ButtonHomePage frontText={'My Decks'} image={logo}
                                        backText={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}/>
                    </div>
                    <div className="button-container">
                        <ButtonHomePage frontText={'Public Decks'} image={logo}
                                        backText={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}/>
                    </div>
                </div>
            </main>
        </>
    );
};

export default HomePage;