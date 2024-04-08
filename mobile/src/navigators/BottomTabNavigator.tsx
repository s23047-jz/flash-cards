import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen, UserPanelScreen } from "../screens";
import UserPanelNavigator from "./UserPanelNavigator";
import {ROUTES} from "../constants"

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator initialRouteName={ROUTES.HOME} screenOptions={{headerShown: false}}>
            <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
            <Tab.Screen name={ROUTES.USER} component={UserPanelNavigator} />
        </Tab.Navigator>
    )
}
