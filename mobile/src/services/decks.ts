import { NavigationProp } from "@react-navigation/native";

import { BASE_API } from "./config";
import { request } from "../utils/request";

export const DECKS_ENDPOINTS = {
  public_decks: `${BASE_API}/decks/public_decks/`,
  create_deck: `${BASE_API}/decks/create_deck`,
  read_deck_by_id: (deck_id) => `${BASE_API}/decks/${deck_id}/flash_cards`,
  get_user_decks: (user_id) => `${BASE_API}/decks/${user_id}/decks/`,
};

class Decks {
  constructor() {}
  public async read_deck_by_id(deck_id, navigation: NavigationProp<any>) {
    const { data } = await request({
      url: DECKS_ENDPOINTS.read_deck_by_id(deck_id),
      navigation,
    });
    return data;
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
}

export const DecksService = new Decks();
