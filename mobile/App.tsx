import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";

import { AuthNavigator } from "./src/navigators";


export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
