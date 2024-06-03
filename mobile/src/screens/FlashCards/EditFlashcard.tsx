import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TextInput, Image } from "react-native";

import GenerateText from "../../assets/images/Generate_text.png";
import { Button } from "../../components";
import { InputValidator } from "../../components/Validator/InputValidator";
import { ROUTES } from "../../constants";
import { ScreenProps } from "../../interfaces/screen";
import { DecksService } from "../../services/decks";
import {FlashCardsService} from "../../services/flashcards";

const EditFlashcard: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { card } = route.params;
  console.log(card);
  
  const [sideA, setSideA] = useState(card.title || ""); // Inicjalizacja sideA wartością title z card
  const [sideB, setSideB] = useState(card["card text"] || ""); // Inicjalizacja sideB wartością card text z card
  
  const handleEdit = async () => {
    if (InputValidator("deck", sideA) && InputValidator("deck", sideB)) {
      const flashCardData = {
        card_title: sideA,
        card_text: sideB,
      };
      try {
        await FlashCardsService.updateFlashcard(card.id, flashCardData, navigation);
        navigation.goBack();
        console.log("Editing flashcard...");
      } catch (error) {
        alert("Nie udało się edytować fiszki");
      }
    } else {
      alert("Flashcards fields must not be empty.");
    }
  }
  
  return (
    <View className="flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900 placeholder-gray-400">
      <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-12">
        Edit Flashcard
      </Text>
      <View className="top-14 absolute left-6">
        <MaterialCommunityIcons
          onPress={() => navigation.goBack()}
          size={30}
          name="arrow-left-bold"
          color="white"
        />
      </View>
      
      <View className="items-center justify-center top-12">
        <View>
          <Text className="text-base mb-3 left-12 text-white font-bold scale-125">
            Front side:
          </Text>
          <TextInput
            className="h-24 w-72 border border-gray-300 rounded-xl px-3 mb-3 text-gray-700 bg-white"
            autoCapitalize="sentences"
            multiline
            value={sideA}
            onChangeText={setSideA}
          />
        </View>
        
        <View className="m-3 pt-5">
          <Text className="text-base mb-3 left-12 text-white font-bold scale-125">
            Back side:
          </Text>
          <TextInput
            className="h-24 w-72 border border-gray-300 rounded-xl px-3 mb-3 text-gray-700 bg-white"
            autoCapitalize="sentences"
            multiline
            value={sideB}
            onChangeText={setSideB}
          />
          <Button className="w-72 h-14 m-5 justify-center mr-auto ml-auto rounded-1xl">
            <Text className="scale-125 mb-1.5 font-bold top-1 text-right right-11">
              Generate content with AI
            </Text>
            <Image
              className="absolute h-10 -left-7"
              resizeMode="contain"
              source={GenerateText}
            />
          </Button>
        </View>
        
        <View className="flex-row">
          <Button
            onPress={() => navigation.goBack()}
            className="p-3 w-32 h-16 items-center justify-center mr-3 rounded-3xl"
          >
            <Text className="mx-5 scale-125 font-bold">Cancel</Text>
          </Button>
          <Button
            onPress={handleEdit}
            className="p-3 ml-3 w-32 h-16 items-center justify-center rounded-3xl"
          >
            <Text className="mx-5 scale-125 font-bold">Edit!</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default EditFlashcard;
