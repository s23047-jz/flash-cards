import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, Alert} from 'react-native';
import {ScreenProps} from "../../interfaces/screen";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Download from "../../assets/images/Download.png";
import {Button, FetchAllFlashcards} from "../../components";
import {ROUTES} from "../../constants";
import {useFocusEffect} from "@react-navigation/native";
import {DeckListInterface} from "../../interfaces/decks";
import * as Speech from "expo-speech";
import {ActiveUser} from "../../services/user";
import {DecksService} from "../../services/decks";

const DisplayPublicDeck: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { deckId } = route.params;
  const { title } = route.params;
  const { deck_category } = route.params;
  const [flashCards, setFlashCards] = useState([]);
  const [user_id, setUserId] = useState([]);
  
  const fetchUserId = async () => {
      const { id } = await ActiveUser.getUserData();
      setUserId(id)
  }
  
  useEffect(() => {
    fetchUserId();
  }, []);
  
  console.log("XDD", deckId)
  console.log(flashCards)
  console.log(title, deck_category)
  console.log("UsER", user_id)
  
  const handleDownloadDeck = async () => {
    if (user_id && deckId) {
      try {
        const response = await DecksService.download_deck(deckId, user_id, navigation);
        console.log("Deck downloaded successfully:", response);
        Alert.alert("Download Success", "Deck has been successfully downloaded.");
        navigation.goBack()
        navigation.navigate(ROUTES.HOME_DECKS)
        navigation.navigate(ROUTES.MY_PUBLIC_DECKS)
      } catch (error) {
        console.error("Failed to download deck:", error);
        Alert.alert("Download Error", "Failed to download the deck.");
      }
    } else {
      Alert.alert("Missing Information", "User ID or Deck ID is missing.");
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      FetchAllFlashcards(deckId, navigation,).then(data => {
        setFlashCards(data);
      }).catch(error => {
        console.error('Error fetching decks:', error);}
      );
    }, [])
  );
  
  
  const showConfirmDialog = () => {
    return Alert.alert(
      "Report deck",
      `Are you sure you want to report deck: ${title}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Report",
          onPress: () => {
            //deleteCardFromApi(card)
            console.log("REPORT DECK")
          },
          style: 'destructive'
        }
      ],
      { cancelable: false }
    );
  };
  
  const FlashCard: React.FC<DeckListInterface> = ({ card }) => {
    const readTitleAloud = () => {
      Speech.speak(card["card text"]);
    };
    
    const readTextAloud = () => {
      Speech.speak(card.title);
    };
    
    return (
      <View className="justify-center">
        <Button
          disabled
          className="p-3 m-3 w-64 h-auto justify-center mr-auto ml-auto rounded-1xl"
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text className="ml-1 w-48 font-bold">{card.title}</Text>
              <View className="border-black w-full h-1 border-b my-1" />
              <Text className="ml-1 w-48 font-bold">{card["card text"]}</Text>
            </View>
            <TouchableOpacity
              onPress={() => readTitleAloud()}
              className="absolute right-0 bottom-0"
            >
              <MaterialCommunityIcons
                size={18}
                name="cellphone-sound"
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => readTextAloud()}
              className="absolute right-0 top-0"
            >
              <MaterialCommunityIcons
                size={18}
                name="cellphone-sound"
                color="black"
              />
            </TouchableOpacity>
          </View>
        </Button>
      </View>
    );
  };
  
  
  
  return (
    <View className="flex-1 bg-sky-500 dark:bg-blue-900 placeholder-gray-400 items-center">
      <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-12">
        {title}
      </Text>
      <Text className="text-white font-extrabold animate-bounce scale-125 absolute top-24 right-12">
        {deck_category}
      </Text>
      <View className=" top-14 absolute left-6">
        <MaterialCommunityIcons
          onPress={() => navigation.goBack()}
          size={30}
          name="arrow-left-bold"
          color="white"
        />
      </View>
      <View className="top-32 w-full flex-row justify-center items-center mb-28">
        <Button
          onPress={handleDownloadDeck}
          className="w-60 h-16 justify-center m-1 rounded-3xl"
        >
          <Text className="mx-8 scale-125 font-bold text-center right-6">Download deck!</Text>
          <Image
            className="absolute flex-grow h-10 -right-3"
            resizeMode="contain"
            source={Download}
          />
        </Button>
        <Button className="w-20 h-16 items-center justify-center m-1 rounded-3xl"
                onPress={() => showConfirmDialog()}
                  >
          <MaterialCommunityIcons
            size={40}
            name="alert"
            color="black"
          />
        </Button>
      </View>
      <View className="flex-1 pt-10 w-full">
      
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

export default DisplayPublicDeck;
