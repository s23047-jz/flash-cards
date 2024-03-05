import { Text, View, SafeAreaView } from 'react-native';
import LoginScreen from "./src/components/LoginScreen";


export default function App() {
  return (

      <View className="flex-1 items-center justify-center bg-sky-500">

          <LoginScreen></LoginScreen>

      </View>
  );
}


