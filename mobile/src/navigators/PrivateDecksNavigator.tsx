import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {ROUTES} from "../constants"
import CreateDeck from "../screens/PrivateDecks/CreateDeck";
import MyDecks from "../screens/PrivateDecks/MyDecks";

const Stack = createNativeStackNavigator();

export default function PrivateDecksNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ROUTES.MYDECKS}>
            <Stack.Screen name={ROUTES.MYDECKS} component={MyDecks} />
            <Stack.Screen name={ROUTES.CREATEDECK} component={CreateDeck} />
        </Stack.Navigator>
    )
}