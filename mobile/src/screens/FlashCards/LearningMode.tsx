import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

import { Button, FetchAllFlashcards } from "../../components";
import { FlashCardsService } from "../../services/flashcards"; // Zaimportuj usługę FlashCardsService
import { ScreenProps } from "../../interfaces/screen";
import {DecksService} from "../../services/decks";

const LearningMode: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { deck } = route.params;
  const [flashCards, setFlashCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [memorizedCards, setMemorizedCards] = useState([]);
  const [alertShown, setAlertShown] = useState(false);  // Nowy stan do śledzenia wyświetlenia alertu
  
  
  
  async function fetchUnmemorizedFlashcards(deckId, navigation) {
    try {
      console.log("POBRANO KARTY Z TALII:", deckId);
      const data = await DecksService.read_not_memorized_flash_cards_from_deck(
        deckId,
        navigation,
      );
      return data;
    } catch (error) {
      console.error("Error checking authentication status:", error);
      throw new Error("Nie udało się pobrać kart z talii");
    }
  }
  
  useFocusEffect(
    useCallback(() => {
      fetchUnmemorizedFlashcards(deck.id, navigation)
      .then((data) => {
        setFlashCards(data);
      })
      .catch((error) => {
        console.error("Error fetching decks:", error);
      });
    }, [navigation]),
  );
  
  const handleCardNavigation = (memorized) => {
    const memorizedCard = memorized ? {
      id: flashCards[currentIndex].id,
      is_memorized: true
    } : null;
    
    if (currentIndex < flashCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      if (memorizedCard) {
        setMemorizedCards(prevMemorizedCards => [...prevMemorizedCards, memorizedCard]);
      }
    } else {
      const updatedMemorizedCards = memorizedCard ? [...memorizedCards, memorizedCard] : memorizedCards;
      Alert.alert(
        "End of Deck",
        "You have completed this learning session!",
        [{ text: "OK", onPress: () => {
            if (updatedMemorizedCards.length > 0) {
              FlashCardsService.updateFlashcards(updatedMemorizedCards, navigation)
              .then(() => navigation.goBack())
              .catch(error => {
                console.error("Error updating memorized cards:", error);
                navigation.goBack();
              });
            } else {
              navigation.goBack();
            }
          } }]
      );
      setAlertShown(true);  // Ustawienie stanu alertShown na true
    }
  };
  
  
  
  
  const FlashCard = () => {
    const [showText, setShowText] = useState(false);
    const [bgColor, setBgColor] = useState("#dc84f1");  // Fioletowy jako domyślny kolor tła
    
    const toggleTextAndBackgroundColor = () => {
      setShowText(!showText);
      setBgColor(bgColor === "#dc84f1" ? "#ffdc11" : "#dc84f1");  // Przełączanie między fioletowym a pomarańczowym
    };
    
    if (flashCards.length > 0 && currentIndex < flashCards.length && !alertShown) {  // Sprawdzenie, czy alert nie został jeszcze wyświetlony
      const card = flashCards[currentIndex];
      return (
        <View className="flex-1 mt-28">
          <Text className="text-white font-extrabold mb-3 scale-150 font-bold text-center ">{(flashCards.length - currentIndex)} flashcards left</Text>
          <TouchableOpacity
            className="border flex-1 mx-10 rounded-3xl items-center justify-center"
            style={{ backgroundColor: bgColor }}  // Stosowanie dynamicznego koloru tła
            onPress={toggleTextAndBackgroundColor}  // Przełącznik stanu na kliknięcie
          >
            <Text style={{ padding: 10, fontSize: 18 }} className="font-bold">{!showText ? card.title : card["card text"]}</Text>
          </TouchableOpacity>
          
          <View className="flex-row items-center justify-center">
            <Button onPress={() => handleCardNavigation(false)} className="w-32 h-16 bg-red-600 dark:bg-red-600 items-center justify-center m-3">
              <MaterialCommunityIcons
                size={60}
                name="close-thick"
                color="black"
              />
            </Button>
            
            <Button onPress={() => handleCardNavigation(true)} className="w-32 h-16 bg-green-400 dark:bg-green-400 items-center justify-center m-3">
              <MaterialCommunityIcons
                size={60}
                name="check-bold"
                color="black"
              />
            </Button>
          </View>
        </View>
      );
    }
    if (!alertShown){
    return (
      <View className="flex-1 items-center mt-40">
        <Text className="text-white font-extrabold m-3 animate-bounce scale-150">No cards available</Text>
        <Text className="text-white font-extrabold m-3 animate-bounce scale-150">Create new flashcards</Text>
        <Text className="text-white font-extrabold m-3 animate-bounce scale-150">or restart your deck in settings</Text>
      </View>
    );}
  };
  
  
  return (
    <View className="flex-1 bg-sky-500 dark:bg-blue-900 placeholder-gray-400">
      <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-10">
        Learning Mode
      </Text>
      <View className="top-14 absolute left-6">
        <MaterialCommunityIcons
          onPress={() => navigation.goBack()}
          size={30}
          name="arrow-left-bold"
          color="white"
        />
      </View>
      
      <FlashCard/>
    </View>
  );
};

export default LearningMode;