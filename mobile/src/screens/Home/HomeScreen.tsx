import React from "react";
import { View, Text } from "react-native";
import { ScreenProps } from "../../interfaces/screen";

const HomeScreen: React.FC<ScreenProps> = ({ navigation }) => {
  return (
    <View className="flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900">
      <Text>Tutaj bedzie homescren po zalogowamniu!</Text>
    </View>
  );
};

export default HomeScreen;
