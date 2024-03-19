import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

import ForgotPassScreen from "./src/screens/ForgotPassScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

import AuthNavigator from "./src/navigators/AuthNavigator";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const LoginMode = () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
