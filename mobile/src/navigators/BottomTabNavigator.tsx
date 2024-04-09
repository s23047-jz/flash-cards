import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen, UserPanelScreen } from "../screens";
import UserPanelNavigator from "./UserPanelNavigator";
import {ROUTES} from "../constants"
import MyDecks from "../screens/PrivateDecks/MyDecks";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator initialRouteName={ROUTES.HOME} screenOptions={{headerShown: false}}>
            <Tab.Screen name={ROUTES.MYDECKS} component={MyDecks} />
            <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
            <Tab.Screen name={ROUTES.USER} component={UserPanelNavigator} />
        </Tab.Navigator>
    )
}
