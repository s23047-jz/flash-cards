// @ts-ignore
import {BASE_API} from './config';
// @ts-ignore
import {request} from '../utils/request';
// @ts-ignore
import {ActiveUser} from './user';


// @ts-ignore
const token = ActiveUser.getAuthorization();
class Report {


    public async get_all_reported_decks(){
        const url = `${BASE_API}/reports/reported_decks`;

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

       public async report_deck(body: object) {
        const url = `${BASE_API}/reports/add_reported_deck`

        return await request({
            url: url,
            method: 'POST',
            headers: {
                    'Authorization': `${token}`
                },
            body: body
        });

    };

    public async delete_deck(deck_id: string) {
        try {
            const url = `${BASE_API}/reports/delete_reported_deck/${deck_id}`;
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

}

// @ts-ignore
export const ReportService = new Report();