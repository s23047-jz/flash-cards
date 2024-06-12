import { NavigationProp } from "@react-navigation/native";

import { BASE_API } from "./config";
import { request } from "../utils/request";

export const NLP_ENDPOINTS = {
    calculate_similarity: `${BASE_API}/nlp/calculate_similarity`
};

class Nlp {
    public async calculateSimilarity(body: object, navigation: NavigationProp<any>) {
        return await request({
            url: NLP_ENDPOINTS.calculate_similarity,
            method: 'POST',
            body,
            navigation
        })
    }
}

export const NlpService = new Nlp();
