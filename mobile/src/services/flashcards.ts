import { NavigationProp } from "@react-navigation/native";

import { BASE_API } from "./config";
import { DECKS_ENDPOINTS } from "./decks";
import { request } from "../utils/request";

export const FLASHCARDS_ENDPOINTS = {
  create_flash_card: `${BASE_API}/flash_card/create_flash_card`,
  delete_flash_card: (flash_card_id) => `${BASE_API}/flash_card/delete_flash_card/${flash_card_id}`,
};

class Flashcards {
  constructor() {}
  public async createFlashcard(body: object, navigation: NavigationProp<any>) {
    console.log(FLASHCARDS_ENDPOINTS.create_flash_card);
    return await request({
      url: FLASHCARDS_ENDPOINTS.create_flash_card,
      method: "POST",
      body,
      navigation,
    });
  }
  
  public async deleteFlashcard(flashcard_id: any, body: any, navigation: NavigationProp<any>) {
    console.log(FLASHCARDS_ENDPOINTS.delete_flash_card(flashcard_id));
    return await request({
      url: FLASHCARDS_ENDPOINTS.delete_flash_card(flashcard_id),
      method: "DELETE",
      body: body, // Upewnij się, że body jest poprawnie użyte w zapytaniu
      navigation,
    });
  }
}

export const FlashCardsService = new Flashcards();
