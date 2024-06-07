import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, Text, TextInput, Image, FlatList } from "react-native";

import Download from "../../assets/images/Download.png";
import BlueCards from "../../assets/images/bluecards.png";
import { Button, FetchAllDecks, FetchDownloadedDecks } from "../../components";
import { ROUTES } from "../../constants";
import { DeckListInterface } from "../../interfaces/decks";
import { ScreenProps } from "../../interfaces/screen";
import {DecksService} from "../../services/decks";
import {ActiveUser} from "../../services/user";

const DeckCard: React.FC<DeckListInterface> = ({
  id,
  title,
  deck_category,
  onPress,
}) => {
  return (
    <Button
      onPress={onPress}
      className="p-3 m-3 w-60 h-16 justify-center mr-auto ml-auto rounded-3xl"
    >
      <Image
        className="absolute flex-grow h-10 -left-8"
        resizeMode="contain"
        source={BlueCards}
      />
      <Text className="scale-125 ml-20 font-bold">{title}</Text>
      <Text className="ml-16 font-bold">{deck_category}</Text>
    </Button>
  );
};

const MyPublicDecks: React.FC<ScreenProps> = ({ navigation, route }) => {
  useState();
  const [search, setSearch] = useState("");
  const [deckList, setDeckList] = useState("");
  const [userId, setUserId] = useState("");
  
  useFocusEffect(
    useCallback(() => {
      FetchDownloadedDecks()
      .then((data) => {
        setDeckList(data?.data);
      })
      .catch((error) => {
        console.error("Error fetching decks:", error);
      });
    }, []), // Pusta tablica zależności oznacza, że hook będzie reagować na każde zmiany focusu
  );
  
  
  
  const handleSearch = async() => {
    try {
      const response = await DecksService.get_filtered_imported_decks(search);
      setDeckList(response);
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <View className="flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900 placeholder-gray-400">
      <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-14">
        My Downloaded Decks
      </Text>
      <View className=" top-14 absolute left-6">
        <MaterialCommunityIcons
          onPress={() => navigation.goBack()}
          size={30}
          name="arrow-left-bold"
          color="white"
        />
      </View>
      <View className="flex-row absolute top-32">
        <TextInput
          className="h-10 w-72 border border-gray-300 rounded-xl px-3 mb-3 text-gray-700 bg-white"
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          onBlur={() => handleSearch()}
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
      <View className="top-48 flex-1 pb-48">
        <Button
          onPress={() => {
            navigation.goBack();
            navigation.navigate(ROUTES.PUBLIC_DECKS);
          }}
          className="p-3 w-60 h-16 justify-center m-3 rounded-3xl"
        >
          <Text className="mx-5 font-bold">Download new deck</Text>
          <Image
            className="absolute flex-grow h-10 -right-4"
            resizeMode="contain"
            source={Download}
          />
        </Button>

        <FlatList
          className=""
          data={deckList} // Przekazanie danych do FlatList
          renderItem={({ item }) => (
            <DeckCard
              id={item.id}
              title={item.title}
              deck_category={item.deck_category}
              onPress={() =>
                navigation.navigate("DisplayDownloadedDeck", {
                  selected_deck: item,
                })
              }
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default MyPublicDecks;
