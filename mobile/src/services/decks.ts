import { NavigationProp } from "@react-navigation/native";

import { BASE_API } from "./config";
import { request } from "../utils/request";
import {ActiveUser} from "./user";

export const DECKS_ENDPOINTS = {
  public_decks: `${BASE_API}/decks/public_decks/`,
  create_deck: `${BASE_API}/decks/create_deck`,
  read_deck_by_id: (deck_id) => `${BASE_API}/decks/${deck_id}`,
  update_deck_title_category: (deck_id) => `${BASE_API}/decks/update_deck/category_and_title/${deck_id}`,
  update_deck_is_public: (deck_id) => `${BASE_API}/decks/update_deck/is_public/${deck_id}`,
  update_deck_is_memorized_false: (deck_id) => `${BASE_API}/decks/update_deck/flashcards_is_memorized/${deck_id}`,
  read_deck_cards_by_id: (deck_id) => `${BASE_API}/decks/${deck_id}/flash_cards`,
  read_memorized_flash_cards_from_deck: (deck_id) => `${BASE_API}/decks/${deck_id}/memorized_flash_cards`,
  read_not_memorized_flash_cards_from_deck: (deck_id) => `${BASE_API}/decks/${deck_id}/not_memorized_flash_cards`,
  get_user_decks: (user_id) => `${BASE_API}/decks/${user_id}/decks/`,
  get_downloaded_decks: (user_id) => `${BASE_API}/decks/${user_id}/imported/decks/`,
  delete_deck: (deck_id) => `${BASE_API}/decks/delete_deck/${deck_id}`,
  download_deck: (deck_id, user_id) => `${BASE_API}/decks/copy_deck/${deck_id}/${user_id}`,
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
  
  public async download_deck(deck_id: any, user_id: any, navigation: NavigationProp<any>) {
    console.log(DECKS_ENDPOINTS.download_deck(deck_id, user_id));
    return await request({
      url: DECKS_ENDPOINTS.download_deck(deck_id, user_id),
      method: "POST",
      navigation,
    });
  }
  
  public async filter_imported_decks_by_user_id(user_id: any, filterString: string, navigation: NavigationProp<any>) {
    const encodedFilterString = encodeURIComponent(filterString || '');
    const url = `${BASE_API}/decks/${user_id}/filtered_imported_decks/?filter_string=${encodedFilterString}`;
    console.log("Requesting URL:", url);
    return await request({
      url,
      navigation,
    });
  }
  
  public async get_downloaded_decks(user_id: any, navigation: NavigationProp<any>) {
    console.log(DECKS_ENDPOINTS.get_downloaded_decks(user_id));
    return await request({
      url: DECKS_ENDPOINTS.get_downloaded_decks(user_id),
      navigation,
    });
  }
  
  
  public async read_filtered_decks_by_user_id(user_id: any, filterString: string = '', navigation: NavigationProp<any>) {
    console.log("Requesting URL:", DECKS_ENDPOINTS.read_filtered_decks_by_user_id(user_id, filterString));
    return await request({
      url: DECKS_ENDPOINTS.read_filtered_decks_by_user_id(user_id, filterString),
      navigation,
    });
  }
  
  
  
  public async read_filtered_decks_by_user_id(user_id: any, filter: string, navigation: NavigationProp<any>) {
    console.log(DECKS_ENDPOINTS.read_filtered_decks_by_user_id(user_id, filter));
    return await request({
      url: `${DECKS_ENDPOINTS.get_user_decks(user_id)}/filtered_decks?filter_string=${encodeURIComponent(filter)}`,
      navigation,
    });
  }
  
  public async get_filtered_decks(filterString: string): Promise<any> {
    const token = await ActiveUser.getAuthorization();
    const user_id = ActiveUser.getId();
    const url = `${BASE_API}/decks/${user_id}/filtered_decks/?filter_string=${filterString}`;
    console.log(token)
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  public async get_filtered_imported_decks(filterString: string): Promise<any> {
    const token = await ActiveUser.getAuthorization();
    const user_id = ActiveUser.getId();
    const url = `${BASE_API}/decks/${user_id}/filtered_imported_decks/?filter_string=${filterString}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  
}

export const DecksService = new Decks();
