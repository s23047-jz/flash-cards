import React, {useState} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ROUTES } from "../constants";
import { HomeScreen, MyPublicDecks, MyPrivateDecks, CreateDeck, DisplayFlashcards, CreateFlashcard} from "../screens";
import {ActiveUser} from "../services/user";
import {DecksService} from "../services/decks";
import DisplayDeck from "../screens/ChooseDecksType/DisplayDeck";


const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    const [deckList, setDeckList] = useState([]);

    const fetchDecks = async (navigation) => {
        try {
          console.log('POBRANO W HOMENAVIGATOR')
            const { id } = await ActiveUser.getUserData();
            const data = await DecksService.getUserDecks(id, navigation)
            setDeckList(data)
        } catch (error) {
            console.error('Error checking authentication status:', error);
            setDeckList([])
        }
    };



    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ ROUTES.HOME_DECKS }>
            <Stack.Screen name={ ROUTES.HOME_DECKS } component={HomeScreen} initialParams={{fetchDecks}} />
            <Stack.Screen name={ ROUTES.CREATE_DECK } component={CreateDeck} initialParams={{fetchDecks}}/>
            <Stack.Screen name={ ROUTES.MY_PRIVATE_DECKS } component={MyPrivateDecks} initialParams={{fetchDecks, deckList}}/>
            <Stack.Screen name={ ROUTES.MY_PUBLIC_DECKS } component={MyPublicDecks} />
            <Stack.Screen name={ ROUTES.DISPLAY_MY_DECK } component={DisplayDeck} />
            <Stack.Screen name={ ROUTES.DISPLAY_FLASHCARDS } component={DisplayFlashcards} initialParams={{fetchDecks, deckList}} />
            <Stack.Screen name={ ROUTES.CREATE_FLASHCARD } component={CreateFlashcard} initialParams={{fetchDecks, deckList}}/>
        </Stack.Navigator>
    )
};
