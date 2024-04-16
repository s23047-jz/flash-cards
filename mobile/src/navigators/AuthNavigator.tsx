import React, {useEffect, useState} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Text} from "react-native";

import {ROUTES} from "../constants"
import {ActiveUser} from "../services/user";

import { LoginScreen, RegisterScreen, ForgotPassScreen } from "../screens";
import BottomTabNavigator from "./BottomTabNavigator";
import CreateDeck from "../screens/PrivateDecks/CreateDeck";
import PrivateDecksNavigator from "./PrivateDecksNavigator";
import {ScreenStack} from "react-native-screens";


const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const checkAuthentication = async () => {
            try {
                const authenticated = await ActiveUser.isAuthenticated();
                setIsAuthenticated(authenticated);
                setLoading(false);
            } catch (error) {
            console.error('Error checking authentication status:', error);
            setIsAuthenticated(false);
            setLoading(false);
        }
    };
    checkAuthentication();
  }, []);

    if (loading) {
        return (
            <Text>Loading...</Text>
        );
    }
    return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={isAuthenticated ? ROUTES.HOME : ROUTES.LOGIN}>
        <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassScreen} />
        <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
        <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} />
        <Stack.Screen name={ROUTES.HOME} component={BottomTabNavigator} />
    </Stack.Navigator>
    );
}
