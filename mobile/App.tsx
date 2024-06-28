import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";

import { AuthNavigator } from "./src/navigators";
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
console.warn = () => {};

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
