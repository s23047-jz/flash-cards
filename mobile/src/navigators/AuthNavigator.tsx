import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";

import {ROUTES} from "../constants"
import {ActiveUser} from "../services/user";

import ForgotPassScreen from "../screens/ForgotPassScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => setIsLoggedIn(ActiveUser.isAuthenticated))

    return (
    <Stack.Navigator screenOptions={{}} initialRouteName={isLoggedIn ? ROUTES.HOME : ROUTES.LOGIN}>
        <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassScreen} />
        <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
        <Stack.Screen name={ROUTES.REGISTER} component={SignUpScreen} />
    </Stack.Navigator>
    );
}
