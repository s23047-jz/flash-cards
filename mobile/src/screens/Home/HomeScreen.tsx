import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

// @ts-ignore
import BlueCards from "../../assets/images/bluecards.png";
import GreenCards from "../../assets/images/greencards.png";
import Logo from "../../assets/images/logo.png";
// @ts-ignore
import Plus from "../../assets/images/Plus.png";
// @ts-ignore
// @ts-ignore
import { ROUTES } from "../../constants";
import { ScreenProps } from "../../interfaces/screen";
import PrivateDecksNavigator from "../../navigators/PrivateDecksNavigator";

import { DeckList } from "../index";
import {Button} from "../../components";

const HomeScreen: React.FC<ScreenProps> = ({ navigation }) => {
  useState();

  const handleNewDeck = async () => {};

  const handleMyDecks = async () => {};

  const handlePublicDecks = async () => {};

  return (
    <View className="flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900">
      <Image
        className="mx-auto object-scale-down m-5 h-40 w-40"
        source={Logo}
      />

      <Button
        onPress={() =>
          navigation.navigate(ROUTES.CREATE_DECK, {
            screen: "CreateDeck",
          })
        }

        className="flex flex-row items-center justify-left bg-cyan-400 dark:bg-blue-500 border-sky-600 border-2 m-2 rounded-3xl object-scale-down h-24 w-60"
      >
        <Text className="mx-5 font-bold">Create new one</Text>

        <Image
          className="absolute flex-grow h-16 -right-6"
          resizeMode="contain"
          source={Plus}
        />
      </Button>

      <Button
        onPress={() =>
          navigation.navigate(ROUTES.MY_DECKS, {
            screen: "MyDecks",
          })
        }
        className="flex flex-row items-center justify-left bg-cyan-400 dark:bg-blue-500 border-sky-600 border-2 m-2 rounded-3xl object-scale-down h-24 w-60"
      >
        <Text className="mx-5 font-bold">My Decks</Text>

        <Image
          className="absolute flex-grow h-16 -right-6"
          resizeMode="contain"
          source={GreenCards}
        />
      </Button>

      <Button
        onPress={() => navigation.navigate(ROUTES.MY_PUBLIC_DECKS, {
            screen: "MyPublickDecks",
        })
        }
        className="flex flex-row items-center justify-left bg-cyan-400 dark:bg-blue-500 border-sky-600 border-2 m-2 rounded-3xl object-scale-down h-24 w-60"
      >
        <Text className="mx-5 font-bold">Publick Decks</Text>

        <Image
          className="absolute flex-grow h-16 -right-6"
          resizeMode="contain"
          source={BlueCards}
        />
      </Button>
    </View>
  );
};

export default HomeScreen;
