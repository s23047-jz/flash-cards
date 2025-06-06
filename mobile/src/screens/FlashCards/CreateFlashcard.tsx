import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {View, Text, TextInput, Image, Alert} from "react-native";

import GenerateText from "../../assets/images/Generate_text.png";
import {Button, Loader} from "../../components";
import { InputValidator } from "../../components/Validator/InputValidator";
import { ScreenProps } from "../../interfaces/screen";
import { ChatService } from "../../services/chat";
import { FlashCardsService } from "../../services/flashcards";

const CreateFlashcard: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { deck } = route.params;

  useState();
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const trimmedSideA = sideA.substring(0, 254);
    const trimmedSideB = sideB.substring(0, 510);

    if (
      InputValidator("deck", trimmedSideA) &&
      InputValidator("deck", trimmedSideB)
    ) {
      const flashcardData = {
        deck_id: deck.id,
        card_title: trimmedSideA,
        card_text: trimmedSideB,
      };

      try {
        await FlashCardsService.createFlashcard(flashcardData, navigation);
        navigation.goBack();
      } catch (error) {
        console.error("Failed to create flashcard:", error);
        alert("Failed to create flashcard.");
      }
    } else {
      alert("Flashcards fields must not be empty.");
    }
  };
  
  const handleGenerate = async () => {
    if (sideA.length !== 0) {
      const messageToSend = `Please limit the response to 500 characters: ${sideA}`;
      try {
        setLoading(true);
        const response = await ChatService.sent_message(messageToSend);
        setLoading(false);
        
        Alert.alert(
          "Confirm Generated Content",
          "Please note that the response from the AI chat may not be accurate.\n\n" + response,
          [
            { text: "Cancel", style: "cancel" },
            { text: "Accept", onPress: () => setSideB(response) }
          ],
          { cancelable: false }
        );
      } catch (error) {
        console.error("Failed to generate content with AI:", error);
        alert("Failed to generate content with AI. Please try again.");
      }
    } else {
      alert("Flashcard front side field must not be empty.");
    }
  };
  
  if (loading) {
    return (
      <Loader />
    )
  }
  
  return (
    <View className="flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900 placeholder-gray-400">
      <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-12">
        Create Flashcard
      </Text>
      <View className=" top-14 absolute left-6">
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
            onChangeText={setSideA}
            value={sideA}
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
          <Button
            className="w-72 h-14 m-5 justify-center mr-auto ml-auto rounded-1xl"
            onPress={handleGenerate}
          >
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
            className="p-3 w-32 items-center h-16 justify-center mr-3 rounded-3xl"
          >
            <Text className="mx-5 scale-125 font-bold">Cancel</Text>
          </Button>
          <Button
            onPress={handleCreate}
            className="p-3 ml-3 w-32 h-16 items-center justify-center rounded-3xl"
          >
            <Text className="mx-5 scale-125 font-bold">Create!</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default CreateFlashcard;
