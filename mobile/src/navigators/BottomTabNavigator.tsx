import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "react-native";

import {
    HomeNavigator,
    UserPanelNavigator,
    PublicDecksNavigator,
    ModeratorNavigator
} from "./index";
import { ROUTES } from "../constants";

import Lens from "../assets/images/Lens.png";
import Lens_blue from "../assets/images/Lens_blue.png";
import Profile from "../assets/images/Profile.png";
import Profile_blue from "../assets/images/Profile_blue.png";
import Study from "../assets/images/Study.png";
import Study_blue from "../assets/images/Study_blue.png";
import { useColorScheme } from "nativewind";
import { ActiveUser } from "../services/user";
import { ROLES_MAPPING } from "../utils/roles";


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const { colorScheme } = useColorScheme();

    const mappedScreens = [
        {
            id: 1,
            route: ROUTES.HOME_DECKS,
            component: HomeNavigator
        },
        {
            id: 2,
            route: ROUTES.PUBLIC_DECKS,
            component: PublicDecksNavigator
        },
        {
            id: 3,
            route: ROUTES.USER,
            component: UserPanelNavigator
        }
    ]
    let [screens, setScreens] = useState(mappedScreens)

    useFocusEffect(
        useCallback(() => {
            const checkIsModeratorRole = async () => {
                try {
                    setScreens(mappedScreens)
                    const { role } = await ActiveUser.getUserData();
                    if ([ROLES_MAPPING.ADMIN, ROLES_MAPPING.MODERATOR].includes(role)) {
                        setScreens(prevState => [
                            ...prevState,
                            {
                                id: 4,
                                route: ROUTES.MODERATOR_SCREEN,
                                component: ModeratorNavigator
                            }
                        ]);
                    }
                } catch (error) {
                    console.error('Error checking authentication status:', error);
                }
            };
            checkIsModeratorRole();
            // Optionally, you can return a cleanup function here
            return () => {};
        }, [])
    );
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME_DECKS}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeDecks' && focused) {
            iconName = <Image source={Study_blue} className={" object-scale-down w-10 h-10"}/>
          } else if (route.name === 'HomeDecks' && !focused){
            iconName = <Image source={Study} className={" object-scale-down w-10 h-10"}/>
          }
          if (route.name === 'PublicDecks' && focused) {
            iconName = <Image source={Lens_blue} className={" object-scale-down w-10 h-10"}/>
          }else if (route.name === 'PublicDecks' && !focused){
            iconName = <Image source={Lens} className={" object-scale-down w-10 h-10"}/>
          }
          if (route.name === 'User' && focused) {
            iconName = <Image source={Profile_blue} className={" object-scale-down w-10 h-10"}/>
          }else if (route.name === 'User' && !focused){
            iconName = <Image source={Profile} className={" object-scale-down w-10 h-10"}/>
          }
          // You can return any component that you like here!
          return iconName;
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: colorScheme === 'dark' ? '#3D6EF1' : '#4FC3F7',
        tabBarInactiveBackgroundColor: colorScheme === 'dark' ? '#3D6EF1' : '#4FC3F7'
      })}

    >
        {screens.map(screen => (
            <Tab.Screen key={screen.id} name={screen.route} component={screen.component} />
        ))}
    </Tab.Navigator>
  );
}
