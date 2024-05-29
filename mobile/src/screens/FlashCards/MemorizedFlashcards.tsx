import React, {useCallback, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {ScreenProps} from "../../interfaces/screen";
import {DecksService} from "../../services/decks";
import {useFocusEffect} from "@react-navigation/native";
import {DeckListInterface} from "../../interfaces/decks";
import {Button} from "../../components";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const MemorizedFlashcards: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { deck } = route.params;
  const [flashCards, setFlashCards] = useState([]);
  
  async function fetchMemorizedFlashcards(deckId, navigation) {
    try {
      console.log('POBRANO KARTY Z TALII:', deckId);
      const data = await DecksService.read_memorized_flash_cards_from_deck(deckId, navigation);
      return data;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      throw new Error('Nie udało się pobrać kart z talii');
    }
  }
  
  useFocusEffect(
    useCallback(() => {
      fetchMemorizedFlashcards(deck.id, navigation,).then(data => {
        setFlashCards(data);
      }).catch(error => {
        console.error('Error fetching decks:', error);}
      );
    }, [])
  );
  
  const FlashCard: React.FC<DeckListInterface> = ({ card  }) => {
    console.log(card)
    return (
      <View className="justify-center">
        <Button className="p-3 m-3 w-64 h-auto justify-center mr-auto ml-auto rounded-1xl">
          <Text className="ml-1 font-bold">{card.title}</Text>
          <View className="border-black w-full h-1 border-b my-1"/>
          <Text className="ml-1 font-bold">{card['card text']}</Text>
        </Button>
      </View>
    );
  };
  
  return (
    <View className="flex-1 bg-sky-500 dark:bg-blue-900 placeholder-gray-400 pb-4 items-center">
      <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-14">
        Memorized Flashcards
      </Text>
      <View className=" top-14 absolute left-6">
        <MaterialCommunityIcons
          onPress={() => navigation.goBack()}
          size={30}
          name="arrow-left-bold"
          color="white"
        />
      </View>
      <View className="flex-1 top-32 pb-28 w-full">
        <FlatList
          className="w-full"
          data={flashCards}
          renderItem={({ item }) => (
            <FlashCard card={item}  />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default MemorizedFlashcards;
