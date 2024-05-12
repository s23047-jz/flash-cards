import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ROUTES } from "../constants";
import { HomeScreen, MyPublicDecks, MyDecks } from "../screens";
import CreateDeck from "../screens/PrivateDecks/CreateDeck";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ ROUTES.HOME }>
            <Stack.Screen name={ ROUTES.HOME } component={HomeScreen} />
            <Stack.Screen name={ ROUTES.CREATE_DECK } component={CreateDeck} />
            <Stack.Screen name={ ROUTES.MY_DECKS } component={MyDecks} />
            <Stack.Screen name={ ROUTES.MY_PUBLIC_DECKS } component={MyPublicDecks} />
        </Stack.Navigator>
    )
};
