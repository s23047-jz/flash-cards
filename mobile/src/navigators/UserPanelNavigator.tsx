import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {ROUTES} from "../constants"
import { UserPanelScreen, UserUpdateUsername } from "../screens";

const Stack = createNativeStackNavigator();

export default function UserPanelNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ROUTES.USER_DETAILS}>
        <Stack.Screen name={ROUTES.USER_DETAILS} component={UserPanelScreen} />
        <Stack.Screen name={ROUTES.UPDATE_USERNAME} component={UserUpdateUsername} />
        </Stack.Navigator>
    )
}