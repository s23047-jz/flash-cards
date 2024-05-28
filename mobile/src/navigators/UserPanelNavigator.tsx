import React, { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ROUTES } from "../constants";
import {
    UserPanelScreen,
    UserUpdate,
    UserDelete,
    UserStats,
    UserUpdateAvatar
} from "../screens";
import { ActiveUser } from "../services/user";
import { Loader } from "../components";

const Stack = createNativeStackNavigator();

export default function UserPanelNavigator() {

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(
        {username: '', email: '', id: '', avatar: ''}
    );

    useEffect(() => {
        setLoading(true);
        getUserData();
    }, []);


    const getUserData = async () => {
        try {
            setLoading(true);
            const { username, email, id, avatar } = await ActiveUser.getUserData();
            setUserData({ username, email, id, avatar });
            setLoading(false);
        } catch (error) {
            console.error('Error checking authentication status:', error);
            setUserData({username: '', email: '', id: '', avatar: ''});
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Loader />
        );
    }

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ROUTES.USER_DETAILS}>
            <Stack.Screen name={ROUTES.USER_DETAILS} component={UserPanelScreen} initialParams={{userData, getUserData}}/>
            <Stack.Screen name={ROUTES.USER_UPDATE} component={UserUpdate} initialParams={{getUserData}} />
            <Stack.Screen name={ROUTES.USER_DELETE} component={UserDelete} initialParams={{userData}} />
            <Stack.Screen name={ROUTES.USER_STATS} component={UserStats} initialParams={{userId: userData.id}} />
            <Stack.Screen name={ROUTES.USER_UPDATE_AVATAR} component={UserUpdateAvatar} initialParams={{avatar: userData.avatar}} />
        </Stack.Navigator>
    )
}