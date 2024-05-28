//AUTH
export { default as LoginScreen } from "./Auth/LoginScreen";
export { default as RegisterScreen } from "./Auth/SignUpScreen";
export { default as ForgotPassScreen } from "./Auth/ForgotPassScreen";

//HOME DECKS
export { default as HomeScreen } from "./ChooseDecksType/HomeScreen";
export { default as MyPrivateDecks } from "./ChooseDecksType/MyPrivateDecks";
export { default as MyPublicDecks } from "./ChooseDecksType/MyPublicDecks";
export { default as CreateDeck } from "./ChooseDecksType/CreateDeck";
export { default as DeckSettings } from "./ChooseDecksType/DeckSettings";
export { default as EditDeck } from "./ChooseDecksType/EditDeck";

//FLASHCARDS / LEARNING
export { default as DisplayFlashcards } from "./FlashCards/DisplayFlashcards";
export { default as CreateFlashcard } from "./FlashCards/CreateFlashcard";
export { default as EditFlashcard } from "./FlashCards/EditFlashcard";

//USER PANEL
export { default as UserPanelScreen } from "./Users/UserPanelScreen";
export { default as UserUpdate } from "./Users/UserUpdate";
export { default as UserDelete } from "./Users/UserDelete";
export { default as UserStats } from "./Users/UserStats";
export { default as UserUpdateAvatar } from "./Users/UserUpdateAvatar";

export { default as DeckList } from "./Decks/DeckList";
