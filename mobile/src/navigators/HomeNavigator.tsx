import React, {useState} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ROUTES } from "../constants";
import { HomeScreen, MyPublicDecks, MyPrivateDecks, CreateDeck} from "../screens";
import {ActiveUser} from "../services/user";
import {DecksService} from "../services/decks";
import DisplayDeck from "../screens/ChooseDecksType/DisplayDeck";


const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    const [deckList, setDeckList] = useState([]);
    const fetchDecks = async (navigation) => {
        try {
            const { id } = await ActiveUser.getUserData();
            const data = await DecksService.getUserDecks(id, navigation)
            console.log(data)
            setDeckList(data)
        } catch (error) {
            console.error('Error checking authentication status:', error);
            setDeckList([])
        }
    };


    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ ROUTES.HOME_DECKS }>
            <Stack.Screen name={ ROUTES.HOME_DECKS } component={HomeScreen} />
            <Stack.Screen name={ ROUTES.CREATE_DECK } component={CreateDeck} initialParams={{fetchDecks}}/>
            <Stack.Screen name={ ROUTES.MY_PRIVATE_DECKS } component={MyPrivateDecks} initialParams={{fetchDecks, deckList}}/>
            <Stack.Screen name={ ROUTES.MY_PUBLIC_DECKS } component={MyPublicDecks} />
            <Stack.Screen name={ ROUTES.DISPLAY_MY_DECK } component={DisplayDeck} />
        </Stack.Navigator>
    )
};
