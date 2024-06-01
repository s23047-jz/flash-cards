import { NavigationProp } from "@react-navigation/native";

import { BASE_API } from "./config";
import { request } from "../utils/request";

export const REPORTS_ENDPOINTS = {
    reported_decks_list: `${BASE_API}/reports/`
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

}

export const ReportsService = new Reports();

