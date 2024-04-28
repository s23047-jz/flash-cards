import React, { useEffect, useState} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ROUTES } from "../constants"
import { UserPanelScreen, UserUpdate } from "../screens";
import { ActiveUser } from "../services/user";
import {Text} from "react-native";

const Stack = createNativeStackNavigator();

export default function UserPanelNavigator() {

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({username: '', email: ''});

    useEffect(() => {
        setLoading(true);
    getUserData();
    }, []);


    const getUserData = async () => {
        try {
            setLoading(true);
            const { username, email } = await ActiveUser.getUserData();
            setUserData({ username, email });
            setLoading(false);
        } catch (error) {
            console.error('Error checking authentication status:', error);
            setUserData({username: '', email: ''});
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Text>Loading...</Text>
        );
    }

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ROUTES.USER_DETAILS}>
            <Stack.Screen name={ROUTES.USER_DETAILS} component={UserPanelScreen} initialParams={{userData, getUserData}}/>
            <Stack.Screen name={ROUTES.USER_UPDATE} component={UserUpdate} initialParams={{getUserData}} />
        </Stack.Navigator>
    )
}