import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {ROUTES} from "../constants"
import {ActiveUser} from "../services/user";

import { LoginScreen, RegisterScreen, ForgotPassScreen } from "../screens";
import BottomTabNavigator from "./BottomTabNavigator";


const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ActiveUser.isAuthenticated() ? ROUTES.HOME : ROUTES.LOGIN}>
        <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassScreen} />
        <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
        <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} />
        <Stack.Screen name={ROUTES.HOME} component={BottomTabNavigator} />
    </Stack.Navigator>
    );
}
