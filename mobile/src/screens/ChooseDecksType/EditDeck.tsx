import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {ScreenProps} from "../../interfaces/screen";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Button} from "../../components";
import {InputValidator} from "../../components/Validator/InputValidator";
import {DecksService} from "../../services/decks";
import {ROUTES} from "../../constants";
const EditDeck: React.FC<ScreenProps> = ({ navigation, route }) => {
  useState();

  const { deck } = route.params;
  console.log(deck)
  const [title, setTitle] = useState(deck.title || "");
  const [category, setCategory] = useState(deck.deck_category || "");
  
  const handleEdit = async () => {
    if (InputValidator("deck", title) && InputValidator("deck", category)) {
      const deck_data = {
        title: title,
        deck_category: category,
      };
      try {
        await DecksService.update_deck_title_category(deck.id, deck_data, navigation);
        navigation.goBack();
        console.log("Editing deck...");
      } catch (error) {
        alert("Nie udało się edytować decku");
      }
    } else {
      alert("Flashcards fields must not be empty.");
    }
  }
  
  return (
    <View className="flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900 placeholder-gray-400">
      <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-10">
        Edit Deck
      </Text>
      <View className=" top-14 absolute left-6">
        <MaterialCommunityIcons
          onPress={() => navigation.goBack()}
          size={30}
          name="arrow-left-bold"
          color="white"
        />
      </View>
      
      <View className="m-3">
        <Text className="text-base mb-3 left-12 text-white font-bold scale-125">
          Title:
        </Text>
        <TextInput
          className="h-10 w-72 border border-gray-300 rounded-xl px-3 mb-3 text-gray-700 bg-white"
          autoCapitalize="none"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      
      <View className="m-3">
        <Text className="text-base mb-3 left-12 text-white font-bold scale-125">
          Category:
        </Text>
        <TextInput
          className="h-10 w-72 border border-gray-300 rounded-xl px-3 mb-3 text-gray-700 bg-white"
          autoCapitalize="none"
          value={category}
          onChangeText={setCategory}
        />
      </View>
      
      <View className="flex-row top-6">
        <Button
          onPress={() => navigation.goBack()}
          className="p-3 w-30 h-16 justify-center mr-3 rounded-3xl"
        >
          <Text className="mx-5 scale-125 font-bold">Cancel</Text>
        </Button>
        <Button
          onPress={handleEdit}
          className="p-3 ml-3 w-25 h-16 justify-center rounded-3xl"
        >
          <Text className="mx-5 scale-125 font-bold">Edit!</Text>
        </Button>
      </View>
    </View>
  );
};

export default EditDeck;
