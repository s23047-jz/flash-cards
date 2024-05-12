import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ROUTES } from "../constants";
import { HomeScreen, DeckList } from "../screens";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ ROUTES.HOME }>
            <Stack.Screen name={ ROUTES.HOME } component={HomeScreen} />
            {/* } <Stack.Screen name={ ROUTES.PUBLIC_DECKS } component={DeckList} /> */}
        </Stack.Navigator>
    )
};
