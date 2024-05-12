import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {Button} from "../../components";
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
          navigation.navigate(ROUTES.MYDECKS, {
            screen: "CreateDeck",
            params: {
              previousScreen: "MyDeck",
            },
          })
        }
        className={'p-3 m-2 h-24 w-60 justify-center mr-auto ml-auto rounded-3xl'}>
        <Text className="mx-5 font-bold">Create new one</Text>

        <Image
          className="absolute flex-grow h-16 -right-6"
          resizeMode="contain"
          source={Plus}
        />
      </Button>

      <Button
        onPress={() =>
          navigation.navigate(ROUTES.MYDECKS, {
            screen: "MyDeck",
          })
        }
        className={'p-3 m-2 h-24 w-60 justify-center mr-auto ml-auto rounded-3xl'}>

        <Text className="mx-5 font-bold">My Decks</Text>

        <Image
          className="absolute flex-grow h-16 -right-6"
          resizeMode="contain"
          source={GreenCards}
        />
      </Button>

      <Button className={'p-3 m-2 h-24 w-60 justify-center mr-auto ml-auto rounded-3xl'}>
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
