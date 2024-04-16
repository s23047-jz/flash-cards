import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import UserPanelNavigator from "./UserPanelNavigator";
import PrivateDecksNavigator from "./PrivateDecksNavigator";
import { ROUTES } from "../constants";
import { HomeScreen } from "../screens";


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name={ROUTES.MYDECKS} component={PrivateDecksNavigator} />
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Tab.Screen name={ROUTES.USER} component={UserPanelNavigator} />
    </Tab.Navigator>
  );
}
