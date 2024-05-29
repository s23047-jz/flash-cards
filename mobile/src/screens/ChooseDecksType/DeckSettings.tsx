import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, {useCallback, useState} from 'react';
import { View, Text, Alert } from "react-native";

import { Button } from "../../components";
import { ROUTES } from "../../constants";
import { ScreenProps } from "../../interfaces/screen";
import { DecksService } from "../../services/decks";
import { FlashCardsService } from "../../services/flashcards";
import deckList from "../Decks/DeckList";
import {useFocusEffect} from "@react-navigation/native";

const DeckSettings: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { deck: selected_deck } = route.params;
  const [deck, setDeck] = useState(selected_deck);
  const [isDeckPublic, setIsDeckPublic] = useState(deck.is_deck_public);
  
  
  
  const fetchAll = useCallback(async () => {
    try {
      const data = await DecksService.read_deck_by_id(deck.id);
      setDeck(data);
      setIsDeckPublic(data.is_deck_public);  // Ensure the visibility state is updated based on fetched data
    } catch (error) {
      console.error("Error fetching deck details:", error);
    }
  }, [deck.id]);
  
  useFocusEffect(
    useCallback(() => {
      fetchAll();
    }, [fetchAll])
  );
  
  
  console.log(deck);

  const handleEditDeck = async () => {
    navigation.navigate(ROUTES.EDIT_DECK, { deck });
  };

  const deleteDeckFromApi = async (deck) => {
    const deck_id = deck.id;

    try {
      await DecksService.delete_deck(deck_id, navigation);
      alert("Deck deleted successfully.");
      navigation.goBack();
      navigation.goBack();
    } catch (error) {
      console.error("Failed to delete deck:", error);
      alert("Failed to delete deck.");
    }
  };
  
  const resetDeckApi = async (deck) => {
    const deck_id = deck.id;
    
    try {
      await DecksService.update_deck_is_memorized_false(deck_id, navigation);
      alert("Deck restarted successfully.");
    }
    
    catch (error) {
      console.error("PODOBNO ERROR PRZY RESECIE:", error);
    }
  };

  const handleDeleteDeck = () => {
    Alert.alert(
      "Delete Deck",
      "Are you sure you want to delete this deck permanently?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteDeckFromApi(deck);
          },
          style: "destructive",
        },
      ],
      { cancelable: false },
    );
  };
  
  const toggleDeckVisibility = async () => {
    const deck_data = { is_deck_public: !isDeckPublic };
    try {
      await DecksService.update_deck_is_public(deck.id, deck_data, navigation);
      setIsDeckPublic(!isDeckPublic);  // Toggle the visibility state
      fetchAll()
      //NIE MOŻE MIEĆ 0 FISZEK ZEBY GO UDOSYTEPNIC
    } catch (error) {
      console.error("Failed to change deck visibility:", error);
      alert("Failed to change deck visibility.");
    }
  };
  
  const handleDeckReset = () => {
    Alert.alert(
      "Reset Deck",
      "Are you sure you want to mark all flashcards as unmemorized?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Reset",
          onPress: () => {
            resetDeckApi(deck);
          },
          style: "destructive",
        },
      ],
      { cancelable: false },
    );
  }
    
    
    return (
    <View className="flex-1 bg-sky-500 dark:bg-blue-900 placeholder-gray-400 justify-center">
      <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-10">
        Deck Settings
      </Text>
      <View className=" top-14 absolute left-6">
        <MaterialCommunityIcons
          onPress={() => navigation.goBack()}
          size={30}
          name="arrow-left-bold"
          color="white"
        />
      </View>
      
      <Button
        className="p-3 m-3 w-72 h-16 justify-center mr-auto ml-auto rounded-1xl"
        onPress={handleEditDeck}
      >
        <Text className="scale-125 mb-1.5 font-bold text-center justify-center">
          Edit
        </Text>
        <Text className="font-bold text-center justify-center">
          deck name or deck category
        </Text>
      </Button>
      
      <Button
        className="p-3 m-3 w-72 h-16 justify-center mr-auto ml-auto rounded-1xl"
        onPress={handleDeleteDeck}
      >
        <Text className="scale-125 mb-1.5 font-bold text-center justify-center">
          Delete deck
        </Text>
        <Text className="font-bold text-center justify-center">
          permanently from your account
        </Text>
      </Button>
      
      <Button onPress={toggleDeckVisibility} className="p-3 m-3 w-72 h-16 justify-center mr-auto ml-auto rounded-1xl">
        <Text className="scale-125 mb-1.5 font-bold text-center">
          {isDeckPublic ? "Make deck private" : "Make deck public"}
        </Text>
        <Text className="font-bold text-center">
          {isDeckPublic ? "so only you can access it" : "so everybody can download it"}
        </Text>
      </Button>
      
      <Button className="p-3 m-3 w-72 h-16 justify-center mr-auto ml-auto rounded-1xl"
      onPress={handleDeckReset}>
        <Text className="scale-125 mb-1.5 font-bold text-center justify-center">
          Restart deck
        </Text>
        <Text className="font-bold text-center justify-center">
          move all flashcards to unmemorized
        </Text>
      </Button>
    </View>
  );
  
};

export default DeckSettings;
