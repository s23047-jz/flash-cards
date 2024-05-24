import { NavigationProp } from "@react-navigation/native";

import { BASE_API } from "./config";
import { DECKS_ENDPOINTS } from "./decks";
import { request } from "../utils/request";

export const FLASHCARDS_ENDPOINTS = {
  create_flash_card: `${BASE_API}/flash_card/create_flash_card`,
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
}

export const FlashCardsService = new Flashcards();
