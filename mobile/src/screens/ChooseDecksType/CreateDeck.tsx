import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import { useNavigationState } from '@react-navigation/native';
import { Button } from "../../components";
import { InputValidator } from "../../components/Validator/InputValidator";
import { ROUTES } from "../../constants";
import { ScreenProps } from "../../interfaces/screen";
import { AuthService } from "../../services/auth";
import { DecksService } from "../../services/decks";
import { ActiveUser } from "../../services/user";
import Routes from "../../constants/routes";

const CreateDeck: React.FC<ScreenProps> = ({ navigation, route }) => {
  useState();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [user_id, setUserId] = useState("");
  
  const getUserData = async () => {
    try {
      const { id } = await ActiveUser.getUserData();
      setUserId(id);
    } catch (error) {
      console.error("Error checking authentication status:", error);
      setUserId("");
    }
  };
  
  useEffect(() => {
    getUserData();
  }, []);
  
  
  const handleCreate = async () => {
    if (InputValidator("deck", title) && InputValidator("deck", category)) {
      await DecksService.createDeck(
        { user_id, title, deck_category: category },
        navigation,
      );
      navigation.goBack();
      navigation.navigate(ROUTES.MY_PRIVATE_DECKS)
      
    } else {
      alert("Category and name field must not be empty.");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-sky-500 dark:bg-blue-900 placeholder-gray-400">
      <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-10">
        Create Deck
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
          onPress={handleCreate}
          className="p-3 ml-3 w-25 h-16 justify-center rounded-3xl"
        >
          <Text className="mx-5 scale-125 font-bold">Create!</Text>
        </Button>
      </View>
    </View>
  );
};

export default CreateDeck;
