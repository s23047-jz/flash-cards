import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../screens";
import {ROUTES} from "../constants"

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator initialRouteName={ROUTES.HOME} screenOptions={{headerShown: false}}>
            <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
        </Tab.Navigator>
    )
}
