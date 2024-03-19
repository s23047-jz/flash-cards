import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";

type HomeScreenNavigationProp = NavigationProp<any>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View className="flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900">
      <Text>Tutaj bedzie homescren po zalogowamniu!</Text>
    </View>
  );
};

export default HomeScreen;
