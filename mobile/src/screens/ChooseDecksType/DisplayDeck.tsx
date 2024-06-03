import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

import GreenCards from "../../assets/images/greencards.png";
import { Button } from "../../components";
import FetchAllDecks from "../../components/ApiCompononets/FetchAllDecks";
import { InputValidator } from "../../components/Validator/InputValidator";
import { ROUTES } from "../../constants";
import { DeckListInterface } from "../../interfaces/decks";
import { ScreenProps } from "../../interfaces/screen";
import { DecksService } from "../../services/decks";
import { ActiveUser } from "../../services/user";
import displayFlashcards from "../FlashCards/DisplayFlashcards";
import { DisplayFlashcards } from "../index";

const DisplayDeck: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { selected_deck } = route.params;
  const [deckList, setDeckList] = useState([]);
  const [deck, setDeck] = useState([]);

  const fetchAll = useCallback(async () => {
    try {
      const data = await DecksService.read_deck_by_id(selected_deck.id);
      setDeck(data);
    } catch (error) {
      console.error("Error checking authentication status:", error);
      setDeck([]);
    }
  }, [selected_deck.id]); // Zależność tylko selected_deck.id

  useFocusEffect(
    useCallback(() => {
      fetchAll();
    }, [fetchAll]), // zależność od fetchDeck
  );

  useFocusEffect(
    useCallback(() => {
      FetchAllDecks()
        .then((data) => {
          setDeckList(data);
        })
        .catch((error) => {
          console.error("Error fetching decks:", error);
        });
    }, []),
  );

  const handleDisplayFlashcards = async () => {
    navigation.navigate(ROUTES.DISPLAY_FLASHCARDS, { deck });
  };

  const handleDeckSettings = async () => {
    navigation.navigate(ROUTES.DECK_SETTINGS, { deck });
  };
  
  const handleMemorizedFlashcards = async () => {
    navigation.navigate(ROUTES.MEMORIZED_FLASHCARDS, { deck });
  };
  
  const handleUnmemorizedFlashcards = async () => {
    navigation.navigate(ROUTES.UNMEMORIZED_FLASHCARDS, { deck });
  };

  function get_number_of_cards(decks, id) {
    // Znajdź obiekt w tablicy, który ma podane ID
    const deck = decks.find((deck) => deck.id === id);

    // Jeśli obiekt istnieje, zwróć jego liczbę kart, w przeciwnym razie zwróć 0
    return deck ? deck.number_of_cards : 0;
  }

  return (
    <View className="flex-1 bg-sky-500 dark:bg-blue-900 placeholder-gray-400">
      <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-10">
        Deck Preview
      </Text>
      <View className=" top-14 absolute left-6">
        <MaterialCommunityIcons
          onPress={() => navigation.goBack()}
          size={30}
          name="arrow-left-bold"
          color="white"
        />
      </View>
      
      <View className="flex-1 items-center top-36 pb-36">
        <Text className="text-white font-bold scale-150">
          {deck.title}
        </Text>
        <Text className="text-white font-bold scale-125 mt-2 mb-1">
          Number of flashcards:{" "}
          {get_number_of_cards(deckList, selected_deck.id)}
        </Text>
        
        <Text className="text-white font-bold scale-125 mb-4">
          Deck status: {deck.is_deck_public ? 'public' : 'private'}
        </Text>
        
        
        <Button
          className="p-3 m-3 w-72 h-16 bg-cyan-400 justify-center mr-auto ml-auto rounded-1xl"
          onPress={handleDisplayFlashcards}
        >
          <Text className="scale-125 mb-1.5 font-bold text-center justify-center">
            Review flashcards
          </Text>
          <Text className="font-bold text-center justify-center">
            Create, edit and delete
          </Text>
        </Button>

        <Button className="p-3 m-3 w-72 h-16 bg-pink-500 justify-center mr-auto ml-auto rounded-1xl">
          <Text className="scale-125 mb-1.5 font-bold text-center justify-center">
            Learn with flashcards
          </Text>
          <Text className="font-bold text-center justify-center">
            Repeat and memorize
          </Text>
        </Button>

        <Button className="p-3 m-3 w-72 h-16 bg-blue-500 justify-center mr-auto ml-auto rounded-1xl">
          <Text className="scale-125 mb-1.5 font-bold text-center justify-center">
            Voice control
          </Text>
          <Text className="font-bold text-center justify-center">
            Repeat and memorize in voice mode
          </Text>
        </Button>

        <Button className="p-3 m-3 w-72 h-16 bg-green-400 justify-center mr-auto ml-auto rounded-1xl"
                onPress={handleMemorizedFlashcards}>
          <Text className="scale-125 mb-1.5 font-bold text-center justify-center">
            Memorized flashcards
          </Text>
          <Text className="font-bold text-center justify-center">
            Review of remembered material
          </Text>
        </Button>

        <Button className="p-3 m-3 w-72 h-16 bg-red-600 mr-auto ml-auto rounded-1xl"
                onPress={handleUnmemorizedFlashcards}>
          <Text className="scale-125 mb-1.5 font-bold text-center justify-center">
            Unremembered flashcards
          </Text>
          <Text className="font-bold text-center justify-center">
            Review of unremembered material{" "}
          </Text>
        </Button>

        <Button className="p-3 m-3 w-72 h-16 bg-amber-300 mr-auto ml-auto rounded-1xl"
        onPress={handleDeckSettings}>
          <Text className="scale-125 mb-1.5 font-bold text-center justify-center">
            Settings
          </Text>
          <Text className="font-bold text-center justify-center">
            Share or delete your deck
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default DisplayDeck;
