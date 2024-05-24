import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";

import Plus from "../../assets/images/Plus.png";
import Trashbin from "../../assets/images/Trashbin.png";
import Pencil from "../../assets/images/Pencil.png";
import { Button } from "../../components";
import { ROUTES } from "../../constants";
import { DeckListInterface } from "../../interfaces/decks";
import { ScreenProps } from "../../interfaces/screen";
import { DecksService } from "../../services/decks";
import { ActiveUser } from "../../services/user";

const FlashCard: React.FC<DeckListInterface> = ({ id, SideA, SideB }) => {
  return (
    <View className="justify-center">
    <Button className="p-3 m-3 w-64 h-auto justify-center mr-auto ml-auto rounded-3xl">
      <Text className="ml-1 font-bold">{SideA}</Text>
      <View className="border-black w-full h-1 border-b my-1"/>
      <Text className="ml-1 font-bold">{SideB}</Text>
      {/* PRZYCISKI EDIT DELETE */}
    </Button>
      <Image
        className="absolute -left-8  h-10"
        resizeMode="contain"
        source={Trashbin}
      />
      <Image
        className="absolute -right-2  h-10"
        resizeMode="contain"
        source={Pencil}
      />
    </View>
  );
};

const DisplayFlashcards: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { fetchDecks, deckList, deck } = route.params;
  const [flashCards, setFlashCards] = useState([]);

  const handleCreateFlashcards = async () => {
    navigation.navigate(ROUTES.CREATE_FLASHCARD, { deck });
  };

  const fetchFlashcards = useCallback(async () => {
    try {
      const data = await DecksService.read_deck_cards_by_id(
        deck.id,
        navigation,
      );
      setFlashCards(data);
      console.log("pozdro", data);
    } catch (error) {
      console.error("Error checking authentication status:", error);
      setFlashCards([]);
    }
  }, [deck.id, navigation]); // Uwzględnienie zależności deck.id i navigation

  useFocusEffect(
    useCallback(() => {
      fetchFlashcards();
    }, [fetchFlashcards]), // zależność od fetchDeck
  );

  return (
    <View className="flex-1 bg-sky-500 dark:bg-blue-900 placeholder-gray-400 justify-center items-center">
      <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-12">
        Flashcards Preview
      </Text>
      <View className=" top-14 absolute left-6">
        <MaterialCommunityIcons
          onPress={() => navigation.goBack()}
          size={30}
          name="arrow-left-bold"
          color="white"
        />
      </View>

      <View className="top-32 w-full items-center  pb-48">
        <Button
          onPress={handleCreateFlashcards}
          className="p-3 w-72 h-16 justify-center m-3 rounded-3xl"
        >
          <Text className="mx-8 scale-125 font-bold">Create new flashcard</Text>
          <Image
            className="absolute flex-grow h-10 -right-6"
            resizeMode="contain"
            source={Plus}
          />
        </Button>

        <FlatList
          className="w-full"
          data={flashCards} // Przekazanie danych do FlatList
          renderItem={({ item }) => (
            <FlashCard SideA={item.title} SideB={item["card text"]} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default DisplayFlashcards;
