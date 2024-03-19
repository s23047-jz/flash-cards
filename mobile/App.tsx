import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

import ForgotPassScreen from "./src/views/ForgotPassScreen";
import HomeScreen from "./src/views/HomeScreen";
import LoginScreen from "./src/views/LoginScreen";
import SignUpScreen from "./src/views/SignUpScreen";

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const LoginMode = () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainStack.Navigator>
          <MainStack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => <LoginScreen {...props} LoginMode={LoginMode} />}
          </AuthStack.Screen>
          <AuthStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="ForgotPass"
            component={ForgotPassScreen}
            options={{ headerShown: false }}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}
