import {BASE_API} from './config';
// @ts-ignore
import {request} from '../utils/request';
import {ActiveUser} from './user';
import {DeckData, DeckInterface} from "../interfaces/auth";


export const AUTH_ENDPOINTS = {
    create_deck: `${BASE_API}/decks/create_deck`,
    create_flash_card: `${BASE_API}/flash_card/create_flash_card`,
};

class Deck {
    deckData: DeckInterface = {}

    constructor() {
        try {
            this.deckData = JSON.parse(localStorage.getItem("deckData") || '{}');
        } catch (e) {
        }

    }


    public async get_all_user_decks(): Promise<any> {
        const user_id = ActiveUser.getId();
        const url = `${BASE_API}/decks/${user_id}/decks/`;

        try {
            const response = await fetch(url);
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


    public async get_filtered_decks(filterString: string): Promise<any> {
        const user_id = ActiveUser.getId();
        const url = `${BASE_API}/decks/${user_id}/filtered_decks/?filter_string=${filterString}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data)
            console.log(url)
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    public async get_deck_by_id(deck_id: string | undefined) {
        const url = `${BASE_API}/decks/${deck_id}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data: DeckData = await response.json();
            console.log(data)
            localStorage.setItem("deckData", JSON.stringify(data))
            return data;

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    public async get_flash_cards_from_deck(deck_id: string | undefined) {
        const url = `${BASE_API}/decks/${deck_id}/flash_cards`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data: DeckData = await response.json();
            return data;

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    public async create_deck(body: object) {
        // @ts-ignore
        return await request({
            url: AUTH_ENDPOINTS.create_deck,
            method: 'POST', body
        });
    }

    public async create_flash_card(body: object) {
        // @ts-ignore
        return await request({
            url: AUTH_ENDPOINTS.create_flash_card,
            method: 'POST', body
        });
    }


}


export const DeckService = new Deck();
