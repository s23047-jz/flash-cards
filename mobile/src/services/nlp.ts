import { NavigationProp } from "@react-navigation/native";

import { BASE_API } from "./config";
import { request } from "../utils/request";

export const NLP_ENDPOINTS = {
    calculate_similarity: `${BASE_API}/nlp/calculate_similarity`,
    calculate_similarity_by_file: `${BASE_API}/nlp/calculate_similarity_audio/`
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
    public async calculateSimilarityByFile(formData: FormData, navigation: NavigationProp<any>) {
        return await request({
            url: NLP_ENDPOINTS.calculate_similarity_by_file,
            method: 'POST',
            headers: {'Content-Type': 'multipart/form-data'},
            formData,
            navigation
        });
    }
}

export const NlpService = new Nlp();
