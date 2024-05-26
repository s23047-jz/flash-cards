import {BASE_API} from './config';
// @ts-ignore
import {request} from '../utils/request';
import {ActiveUser} from './user';
import {DeckData, DeckInterface, FlashCardInterface, FlashCardInterfaceMemorized} from "../interfaces/auth";


export const AUTH_ENDPOINTS = {
    create_deck: `${BASE_API}/decks/create_deck`,
    create_flash_card: `${BASE_API}/flash_card/create_flash_card`,
};

const token = ActiveUser.getAuthorization();
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
            const response = await  fetch(url, {
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

    public async get_all_imported_decks(): Promise<any> {
        const user_id = ActiveUser.getId();
        const url = `${BASE_API}/decks/${user_id}/imported/decks/`;

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

     public async get_user_shared_decks_by_id(user_id: string): Promise<any> {
        const url = `${BASE_API}/decks/${user_id}/shared_decks/`;

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

    public async get_filtered_decks(filterString: string): Promise<any> {
        const user_id = ActiveUser.getId();
        const url = `${BASE_API}/decks/${user_id}/filtered_decks/?filter_string=${filterString}`;

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

    public async get_deck_by_id(deck_id: string | undefined) {
        const url = `${BASE_API}/decks/${deck_id}`;

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
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`
                },
            });
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
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`
                },
            });
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

    public async get_decks_ranking() {
        const url = `${BASE_API}/decks/decks_ranking/`;

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
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`
                },
            });
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
            method: 'POST', body,
            headers: {
                    'Authorization': `${token}`
                },
        });
    }

    public async decks_ranking_filtered_decks(body: object) {
        const url = `${BASE_API}/decks/decks_ranking/filtered_decks/`;

        try {
            const response = await request({
                url: url,
                method: 'POST', body,
                headers: {
                    'Authorization': `${token}`
                },
            });
            // @ts-ignore
            return response;

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    public async create_flash_card(body: object) {
        // @ts-ignore
        return await request({
            url: AUTH_ENDPOINTS.create_flash_card,
            method: 'POST', body,
            headers: {
                    'Authorization': `${token}`
                },
        });
    }

    public async copy_public_deck(deck_id: string, user_id: string) {
        const url = `${BASE_API}/decks/copy_deck/${deck_id}/${user_id}`

        return await request({
            url: url,
            method: 'POST',
            headers: {
                    'Authorization': `${token}`
                },
        });

    };


    public async update_deck_is_public(body: object, deck_id: string) {
        const url = `${BASE_API}/decks/update_deck/is_public/${deck_id}`;
        console.log("ts:", body)
        try {
            // @ts-ignore
            return await request({
                url: url,
                method: 'PUT',
                body: body,
                headers: {
                    'Authorization': `${token}`
                },
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
                body: body,
                headers: {
                    'Authorization': `${token}`
                },
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
                headers: {
                    'Authorization': `${token}`
                },
            });

        } catch (error) {
            // @ts-ignore
            console.error(error.message);
        }
    }

    public async update_single_flash_card(flashcard_id: string, body: object) {
        const url = `${BASE_API}/flash_card/update_flash_card_text/${flashcard_id}`;

        try {
            // @ts-ignore
            return await request({
                url: url,
                method: 'PUT',
                body: body,
                headers: {
                    'Authorization': `${token}`
                },
            });

        } catch (error) {
            // @ts-ignore
            console.error(error.message);
        }
    }

    public async update_deck_title_category(deck_id: string, body: object) {
        const url = `${BASE_API}/decks/update_deck/category_and_title/${deck_id}`;
        console.log(body)
        try {
            // @ts-ignore
            return await request({
                url: url,
                method: 'PUT',
                body: body,
                headers: {
                    'Authorization': `${token}`
                },
            });

        } catch (error) {
            // @ts-ignore
            console.error(error.message);
        }
    }

    public async deleteDeck(deck_id: string) {
        try {
            const url = `${BASE_API}/decks/delete_deck/${deck_id}`;
            return await request({
                url,
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`
                },
            });
        } catch (error) {
            // @ts-ignore
            console.error(error.message);
            throw error;
        }
    }

    public async deleteFlashCard(flashcard_id: string) {
        try {
            const url = `${BASE_API}/flash_card/delete_flash_card/${flashcard_id}`;
            return await request({
                url,
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`
                },
            });
        } catch (error) {
            // @ts-ignore
            console.error(error.message);
            throw error;
        }
    }

    public async get_deck_id() {
        return this.deckData.id
    }

}


export const
    DeckService = new Deck();
