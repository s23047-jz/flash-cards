import {BASE_API} from './config';
// @ts-ignore
import {request} from '../utils/request';
import {ActiveUser} from './user';
import {DeckData, DeckInterface, FlashCardInterface, FlashCardInterfaceMemorized} from "../interfaces/auth";


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

    public async get_memorized_flash_cards_from_deck(deck_id: string | undefined) {
        const url = `${BASE_API}/decks/${deck_id}/memorized_flash_cards`;

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

    public async get_not_memorized_flash_cards_from_deck(deck_id: string | undefined) {
        const url = `${BASE_API}/decks/${deck_id}/not_memorized_flash_cards`;
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


    public async deleteDeck(deck_id: string) {
        try {
            const url = `${BASE_API}/decks/delete_deck/${deck_id}`;
            return await request({
                url,
                method: 'DELETE'
            });
        } catch (error) {
            // @ts-ignore
            console.error(error.message);
            throw error;
        }
    }

     public async update_deck_is_public(body: object, deck_id: string) {
        const url = `${BASE_API}/decks/update_deck/is_public/${deck_id}`;
        console.log("ts:", body)
        try {
            // @ts-ignore
            return await request({
                url: url,
                method: 'PUT',
                body: body
            });

        } catch (error) {
            // @ts-ignore
            console.error(error.message);
        }
    }

    public async update_multiple_flash_card(body: object) {
        const url = `${BASE_API}/flash_card/update_flash_cards`;
        try {
            // @ts-ignore
            return await request({
                url: url,
                method: 'PUT',
                body: body
            });

        } catch (error) {
            // @ts-ignore
            console.error(error.message);
        }
    }

      public async update_multiple_flash_card_is_memorized_false(deck_id: string) {
        const url = `${BASE_API}/decks/update_deck/flashcards_is_memorized/${deck_id}`;
        try {
            // @ts-ignore
            return await request({
                url: url,
                method: 'PUT',
            });

        } catch (error) {
            // @ts-ignore
            console.error(error.message);
        }
    }

    public async get_deck_id() {
        return this.deckData.id
    }

}


export const
    DeckService = new Deck();
