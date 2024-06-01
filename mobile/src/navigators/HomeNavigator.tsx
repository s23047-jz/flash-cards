import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";

import { ROUTES } from "../constants";
import {
  HomeScreen,
  MyPublicDecks,
  MyPrivateDecks,
  CreateDeck,
  DisplayFlashcards,
  CreateFlashcard, EditFlashcard, EditDeck,
} from "../screens";
import DisplayDeck from "../screens/ChooseDecksType/DisplayDeck";
import DeckSettings from "../screens/ChooseDecksType/DeckSettings";
import UnmemorizedFlashcards from "../screens/FlashCards/UnmemorizedFlashcards";
import MemorizedFlashcards from "../screens/FlashCards/MemorizedFlashcards";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ROUTES.HOME_DECKS}>
      <Stack.Screen name={ROUTES.HOME_DECKS} component={HomeScreen} />
      <Stack.Screen name={ROUTES.CREATE_DECK} component={CreateDeck} />
      <Stack.Screen name={ROUTES.MY_PRIVATE_DECKS} component={MyPrivateDecks} />
      <Stack.Screen name={ROUTES.MY_PUBLIC_DECKS} component={MyPublicDecks} />
      <Stack.Screen name={ROUTES.DISPLAY_MY_DECK} component={DisplayDeck} />
      <Stack.Screen name={ROUTES.DISPLAY_FLASHCARDS} component={DisplayFlashcards}/>
      <Stack.Screen name={ROUTES.DECK_SETTINGS} component={DeckSettings} />
      <Stack.Screen name={ROUTES.EDIT_DECK} component={EditDeck} />
      <Stack.Screen name={ROUTES.CREATE_FLASHCARD} component={CreateFlashcard}/>
      <Stack.Screen name={ROUTES.EDIT_FLASHCARD} component={EditFlashcard} />
      <Stack.Screen name={ROUTES.MEMORIZED_FLASHCARDS} component={MemorizedFlashcards} />
      <Stack.Screen name={ROUTES.UNMEMORIZED_FLASHCARDS} component={UnmemorizedFlashcards} />
    
    </Stack.Navigator>
  );
}
