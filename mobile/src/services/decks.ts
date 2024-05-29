import { NavigationProp } from "@react-navigation/native";

import { BASE_API } from "./config";
import { FLASHCARDS_ENDPOINTS } from "./flashcards";
import { request } from "../utils/request";

export const DECKS_ENDPOINTS = {
  public_decks: `${BASE_API}/decks/public_decks/`,
  create_deck: `${BASE_API}/decks/create_deck`,
  read_deck_by_id: (deck_id) => `${BASE_API}/decks/${deck_id}`,
  update_deck_title_category: (deck_id) => `${BASE_API}/decks/update_deck/category_and_title/${deck_id}`,
  update_deck_is_public: (deck_id) => `${BASE_API}/decks/update_deck/is_public/${deck_id}`,
  update_deck_is_memorized_false: (deck_id) => `${BASE_API}/decks/update_deck/flashcards_is_memorized/${deck_id}`,
  update_deck: (deck_id) => `${BASE_API}/decks/update_deck/${deck_id}`, //COŚ TU NIE CHODZI JBC XD
  read_deck_cards_by_id: (deck_id) => `${BASE_API}/decks/${deck_id}/flash_cards`,
  read_memorized_flash_cards_from_deck: (deck_id) => `${BASE_API}/decks/${deck_id}/memorized_flash_cards`,
  read_not_memorized_flash_cards_from_deck: (deck_id) => `${BASE_API}/decks/${deck_id}/not_memorized_flash_cards`,
  get_user_decks: (user_id) => `${BASE_API}/decks/${user_id}/decks/`,
  delete_deck: (deck_id) => `${BASE_API}/decks/delete_deck/${deck_id}`,
};

class Decks {
  constructor() {}
  public async read_deck_by_id(deck_id: any, navigation: NavigationProp<any>) {
    const { data } = await request({
      url: DECKS_ENDPOINTS.read_deck_by_id(deck_id),
      navigation,
    });
    return data;
  }

  public async read_memorized_flash_cards_from_deck(
    deck_id: any,
    navigation: NavigationProp<any>,
  ) {
    const { data } = await request({
      url: DECKS_ENDPOINTS.read_memorized_flash_cards_from_deck(deck_id),
      navigation,
    });
    return data;
  }
  
  public async read_not_memorized_flash_cards_from_deck(
    deck_id: any,
    navigation: NavigationProp<any>,
  ) {
    const { data } = await request({
      url: DECKS_ENDPOINTS.read_not_memorized_flash_cards_from_deck(deck_id),
      navigation,
    });
    return data;
  }
  
  public async read_deck_cards_by_id(
    deck_id: any,
    navigation: NavigationProp<any>,
  ) {
    const { data } = await request({
      url: DECKS_ENDPOINTS.read_deck_cards_by_id(deck_id),
      navigation,
    });
    return data;
  }
  
  public async update_deck_title_category(
    deck_id: any,
    body: any,
    navigation: NavigationProp<any>,
  ) {
    console.log(DECKS_ENDPOINTS.update_deck_title_category(deck_id));
    return await request({
      url: DECKS_ENDPOINTS.update_deck_title_category(deck_id),
      method: "PUT",
      body,
      navigation,
    });
  }
  
  public async update_deck_is_public(
    deck_id: any,
    body: any,
    navigation: NavigationProp<any>,
  ) {
    console.log(DECKS_ENDPOINTS.update_deck_is_public(deck_id));
    return await request({
      url: DECKS_ENDPOINTS.update_deck_is_public(deck_id),
      method: "PUT",
      body,
      navigation,
    });
  }
  
  public async update_deck_is_memorized_false(
    deck_id: any,
    navigation: NavigationProp<any>,
  ) {
    console.log(DECKS_ENDPOINTS.update_deck_is_memorized_false(deck_id));
    return await request({
      url: DECKS_ENDPOINTS.update_deck_is_memorized_false(deck_id),
      method: "PUT",
      navigation,
    });
  }
  
  public async update_deck(
    deck_id: any,
    body: any,
  ) {
    console.log(DECKS_ENDPOINTS.update_deck(deck_id));
    return await request({
      url: DECKS_ENDPOINTS.update_deck(deck_id),
      method: "PUT",
      body,
    });
  }

  public async getPublicDecks(query: object, navigation: NavigationProp<any>) {
    const { data } = await request({
      url: DECKS_ENDPOINTS.public_decks,
      query,
      navigation,
    });
    return data;
  }

  public async getUserDecks(user_id, navigation: NavigationProp<any>) {
    const { data } = await request({
      url: DECKS_ENDPOINTS.get_user_decks(user_id),
      navigation,
    });
    return data;
  }

  public async createDeck(body: object, navigation: NavigationProp<any>) {
    console.log(DECKS_ENDPOINTS.create_deck);
    return await request({
      url: DECKS_ENDPOINTS.create_deck,
      method: "POST",
      body,
      navigation,
    });
  }

  public async delete_deck(deck_id: any, navigation: NavigationProp<any>) {
    const { data } = await request({
      url: DECKS_ENDPOINTS.delete_deck(deck_id),
      method: "DELETE",
      navigation,
    });
    return data;
  }
}

export const DecksService = new Decks();
