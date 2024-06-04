import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ROUTES } from "../constants";
import { DeckList, UserStats } from "../screens";

const Stack = createNativeStackNavigator();

export default function PublicDecksNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ ROUTES.SEARCH }>
            <Stack.Screen name={ ROUTES.SEARCH } component={DeckList} />
            <Stack.Screen name={ ROUTES.USER_STATS } component={UserStats} />
        </Stack.Navigator>
    )
};
