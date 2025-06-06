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

    // @ts-ignore
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

    public async delete_deck_from_reported_list(deck_id: string) {
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

     public async delete_deck_from_app(deck_id: string) {
        try {
            const url = `${BASE_API}/reports/delete_reported_deck_from_app/${deck_id}`;
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

      public async delete_deck_user_from_app(user_id: string) {
        try {
            const url = `${BASE_API}/reports/delete_user/${user_id}`;
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