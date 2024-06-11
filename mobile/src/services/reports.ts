import { NavigationProp } from "@react-navigation/native";

import { BASE_API } from "./config";
import { request } from "../utils/request";
import {ActiveUser} from "./user";

export const REPORTS_ENDPOINTS = {
    reported_decks_list: `${BASE_API}/reports/`,
    delete_report:(deckId) => `${BASE_API}/reports/delete_reported_deck/${deckId}`,
    report_deck: `${BASE_API}/reports/add_reported_deck`
}

class Reports {
    constructor() {};

    public async getReportedDecksList(query: object, navigation: NavigationProp<any>) {
        const { data } = await request({
            url: REPORTS_ENDPOINTS.reported_decks_list,
            query,
            navigation
        })
        return data;
    }

    public async deleteReport(deckId: string, navigation: NavigationProp<any>) {
        return await request({
            url: REPORTS_ENDPOINTS.delete_report(deckId),
            navigation
        })
    }
    
    public async reportDeck(reportDetails: object, navigation: NavigationProp<any>) {
        return await request({
            url: REPORTS_ENDPOINTS.report_deck,
            method: "POST",
            body: reportDetails,
            navigation
        });
    }
    
    public async report_deck(body: object) {
        const url = `${BASE_API}/reports/add_reported_deck`
        const token = await ActiveUser.getAuthorization();
        return await request({
            url: url,
            method: 'POST',
            headers: {
                'Authorization': `${token}`
            },
            body: body
        });
        
    };

}

export const ReportsService = new Reports();

