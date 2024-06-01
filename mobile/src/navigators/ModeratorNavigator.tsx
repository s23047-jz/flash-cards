import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ROUTES } from "../constants";
import {
    UserList,
    ControlView,
    ReportedDecks
} from "../screens";

const Stack = createNativeStackNavigator();

export default function ModeratorNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ROUTES.MODERATOR_CONTROL}>
            <Stack.Screen name={ROUTES.MODERATOR_CONTROL} component={ControlView} />
            <Stack.Screen name={ROUTES.MODERATOR_USERS_SCREEN} component={UserList} />
            <Stack.Screen name={ROUTES.MODERATOR_REPORTED_DECKS_SCREEN} component={ReportedDecks} />
        </Stack.Navigator>
    )
};
