import {Text, View, SafeAreaView, TouchableOpacity, Pressable} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/components/LoginScreen";
import SignUpScreen from "./src/components/SignUpScreen";
import ForgotPassScreen from "./src/components/ForgotPassScreen";

const Stack = createNativeStackNavigator();
const { Navigator, Screen} = Stack;


export default function App() {


    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'Login'} component={LoginScreen} initialParams={Navigator} options={{ headerShown: false}}></Stack.Screen>
                <Stack.Screen name={'SignUp'} component={SignUpScreen} options={{ headerShown: false}}></Stack.Screen>
                <Stack.Screen name={'ForgotPass'} component={ForgotPassScreen} options={{ headerShown: false}}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


