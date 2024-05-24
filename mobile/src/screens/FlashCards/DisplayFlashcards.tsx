import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {View, Text, Image, FlatList, Alert} from "react-native";

import Plus from "../../assets/images/Plus.png";
import Trashbin from "../../assets/images/Trashbin.png";
import Pencil from "../../assets/images/Pencil.png";
import {Button, FetchAllFlashcards} from "../../components";
import { ROUTES } from "../../constants";
import { DeckListInterface } from "../../interfaces/decks";
import { ScreenProps } from "../../interfaces/screen";

const deleteCardFromApi = async (card) => {
  try {
    console.log(card)
    //TUTAJ API
  } catch (error) {

  }
};


const showConfirmDialog = (card, onDeleteConfirmed) => {
  return Alert.alert(
    "Flashcard removal",
    `Are you sure you want to delete this flashcard titled ${card.title}?`,
    [
      {
        text: "No",
        style: "cancel"
      },
      {
        text: "Yes",
        onPress: () => {
          deleteCardFromApi(card)
          .then(() => {
            console.log('Karta została usunięta z API');
            onDeleteConfirmed(card.id); // Aktualizuje stan po pomyślnym usunięciu z API
          })
          .catch(error => {
            console.error('Nie udało się usunąć karty z API', error);
            // Możesz tu dodać obsługę błędów, np. informowanie użytkownika o błędzie
          });
        }
      }
    ],
    { cancelable: false }
  );
};

const DisplayFlashcards: React.FC<ScreenProps> = ({ navigation, route }) => {
  const FlashCard: React.FC<DeckListInterface> = ({ card, onDeleteConfirmed }) => {
    return (
      <View className="justify-center">
        <Button className="p-3 m-3 w-64 h-auto justify-center mr-auto ml-auto rounded-1xl">
          <Text className="ml-1 font-bold">{card.title}</Text>
          <View className="border-black w-full h-1 border-b my-1"/>
          <Text className="ml-1 font-bold">{card['card text']}</Text>
        </Button>
        <Button className="absolute left-2 w-14 h-14 justify-center items-center"
                onPress={() => showConfirmDialog(card, onDeleteConfirmed)}>
          <Image
            className="h-10"
            resizeMode="contain"
            source={Trashbin}
          />
        </Button>
        <Button className="absolute right-2 w-14 h-14 justify-center items-center"
                onPress={handleEditFlashcard}>
          <Image
            className="h-10"
            resizeMode="contain"
            source={Pencil}
          />
        </Button>
      </View>
    );
  };
  
  
  const { deck } = route.params;
  const [flashCards, setFlashCards] = useState([]);
  
  const removeFlashCardById = (id) => {
    setFlashCards(currentFlashCards => currentFlashCards.filter(card => card.id !== id));
  };
  const handleCreateFlashcards = async () => {
    navigation.navigate(ROUTES.CREATE_FLASHCARD, { deck });
  };
  
  const handleEditFlashcard = (card) => {
    navigation.navigate(ROUTES.EDIT_FLSAHCARD, { card });
  };
  
  useFocusEffect(
    useCallback(() => {
      FetchAllFlashcards(deck.id, navigation,).then(data => {
        setFlashCards(data);
      }).catch(error => {
        console.error('Error fetching decks:', error);}
      );
    }, [])
  );

  return (
    <View className="flex-1 bg-sky-500 dark:bg-blue-900 placeholder-gray-400 pb-4 items-center">
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
          data={flashCards}
          renderItem={({ item }) => (
            <FlashCard card={item} onDeleteConfirmed={removeFlashCardById} />
          )}
          keyExtractor={(item) => item.id}
        />
      
      </View>
    </View>
  );
};

export default DisplayFlashcards;
