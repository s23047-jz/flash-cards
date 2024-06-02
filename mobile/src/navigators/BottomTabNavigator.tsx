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

import { useColorScheme } from "nativewind";
import { ActiveUser } from "../services/user";
import { ROLES_MAPPING } from "../utils/roles";

import {
    Lens,
    Lens_blue,
    Profile,
    Profile_blue,
    Study,
    Study_blue,
    Wrench,
    Wrench_blue
} from "../assets/images";


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
                    console.error('Error checking user role:', error);
                }
            };
            checkIsModeratorRole();
            // Optionally, you can return a cleanup function here
            return () => {};
        }, [])
    );

    const ICON_MAPPING = {
        "HomeDecks": { focused: Study_blue, default: Study },
        "PublicDecks": { focused: Lens_blue, default: Lens },
        "User": { focused: Profile_blue, default: Profile },
        "ModeratorScreen": { focused: Wrench_blue, default: Wrench },
    }
  return (
    <Tab.Navigator
        initialRouteName={ROUTES.HOME_DECKS}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                const iconSource = ICON_MAPPING[route.name][focused ? 'focused' : 'default'];
                return <Image source={iconSource} className={"object-scale-down w-10 h-10"} />;
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
