import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import Plus from "../../assets/images/plus.png";
import {ScreenProps} from "../../interfaces/screen";

const MyDecks: React.FC<ScreenProps> = ({ navigation, route }) => {
  useState();
  const [search, setSearch] = useState("");

  return (
    <View className="flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900 placeholder-gray-400">
      <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-10">
        My Decks
      </Text>
      <MaterialCommunityIcons onPress={() => navigation.goBack()}
        className="text-white"
        position="absolute"
        left="4%"
        top="10%"
        size={30}
        name="arrow-left-bold"
        color="white"
      />
      <View className="flex-row absolute top-32">
        <TextInput
          className="h-10 w-72 border border-gray-300 rounded-xl px-3 mb-3 text-gray-700 bg-white"
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
        />
        <MaterialCommunityIcons
          position="absolute"
          right="2%"
          top="10%"
          size={30}
          className="w-max h-max"
          name="magnify"
          color="black"
        />
      </View>
      <TouchableOpacity className="flex flex-row items-center justify-left bg-cyan-400 border-sky-600 border-2 m-2 rounded-100 object-scale-down h-16 w-60">
        <Text className="mx-5 font-bold">Create new deck</Text>

        <Image
          className="absolute flex-grow h-10 -right-6"
          resizeMode="contain"
          source={Plus}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MyDecks;
