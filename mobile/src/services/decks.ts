import { BASE_API } from "./config";
import { request } from "../utils/request";
import { NavigationProp } from "@react-navigation/native";

export const DECKS_ENDPOINTS = {
    public_decks: `${BASE_API}/decks/public_decks/`,
}

class Decks {
    constructor() {}

    public async getPublicDecks(query: object, navigation: NavigationProp<any>) {
        console.log('DECKS_ENDPOINTS', DECKS_ENDPOINTS.public_decks)
        const { data } = await request({
            url: DECKS_ENDPOINTS.public_decks,
            query,
            navigation
        })
        return data;
    }
}

export const DecksService = new Decks();
