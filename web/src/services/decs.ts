import { BASE_API } from './config';
// @ts-ignore
import { request } from '../utils/request';
import { ActiveUser } from './user';

export const AUTH_ENDPOINTS = {
  create_deck: `${BASE_API}/decs/create_deck`,
  create_flash_card: `${BASE_API}/flash_card/create_flash_card`,
};

class Deck {
  constructor() {}

  public async create_deck(body: object) {
    // @ts-ignore
    return  await request({
      url: AUTH_ENDPOINTS.create_deck,
      method: 'POST', body
    });
  }

  public async create_flash_card(body: object) {
    // @ts-ignore
    return  await request({
      url: AUTH_ENDPOINTS.create_flash_card,
      method: 'POST', body
    });
  }


}



export const DeckService = new Deck();
