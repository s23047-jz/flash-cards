import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

import GreenCards from "../../assets/images/greencards.png";
import { Button } from "../../components";
import { InputValidator } from "../../components/Validator/InputValidator";
import { ROUTES } from "../../constants";
import { DeckListInterface } from "../../interfaces/decks";
import { ScreenProps } from "../../interfaces/screen";
import { DecksService } from "../../services/decks";
import { ActiveUser } from "../../services/user";
import displayFlashcards from "../FlashCards/DisplayFlashcards";
import { DisplayFlashcards } from "../index";

const DisplayDeck: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { deck } = route.params;

  const [flashCards, setFlashCards] = useState([]);

  const fetchFlashcards = async (navigation) => {
    try {
      const flashCards = await DecksService.read_deck_by_id(
        deck.id,
        navigation,
      );
      setFlashCards(flashCards);
      console.log("ID", deck.id);
      console.log("selected deck", deck);
      console.log("deck flashcards: ", flashCards);
    } catch (error) {
      console.error("Error checking authentication status:", error);
      setFlashCards([]);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const handleDisplayFlashcards = async () => {
    navigation.navigate(ROUTES.DISPLAY_FLASHCARDS, { deck });
  };

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
      <View className="flex-1 top-36 pb-36">
        <Text className="text-white font-bold scale-150 left-40">
          {deck.title}
        </Text>
        <Text className="text-white font-bold scale-125 left-28 mt-2 mb-4">
          Number of flashcards: {deck.number_of_cards}
        </Text>

        <Button
          className="p-3 m-3 w-72 h-16 justify-center mr-auto ml-auto rounded-1xl"
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

        <Button className="p-3 m-3 w-72 h-16 bg-green-400 justify-center mr-auto ml-auto rounded-1xl">
          <Text className="scale-125 mb-1.5 font-bold text-center justify-center">
            Memorized flashcards
          </Text>
          <Text className="font-bold text-center justify-center">
            Review of remembered material
          </Text>
        </Button>

        <Button className="p-3 m-3 w-72 h-16 bg-red-600 mr-auto ml-auto rounded-1xl">
          <Text className="scale-125 mb-1.5 font-bold text-center justify-center">
            Unremembered flashcards
          </Text>
          <Text className="font-bold text-center justify-center">
            Review of unremembered material{" "}
          </Text>
        </Button>

        <Button className="p-3 m-3 w-72 h-16 bg-amber-300 mr-auto ml-auto rounded-1xl">
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
