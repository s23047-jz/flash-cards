import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ROUTES } from "../constants";
import { HomeScreen, MyPublicDecks, MyPrivateDecks, CreateDeck} from "../screens";


const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ ROUTES.HOME_DECKS }>
            <Stack.Screen name={ ROUTES.HOME_DECKS } component={HomeScreen} />
            <Stack.Screen name={ ROUTES.CREATE_DECK } component={CreateDeck} />
            <Stack.Screen name={ ROUTES.MY_PRIVATE_DECKS } component={MyPrivateDecks} />
            <Stack.Screen name={ ROUTES.MY_PUBLIC_DECKS } component={MyPublicDecks} />
        </Stack.Navigator>
    )
};
