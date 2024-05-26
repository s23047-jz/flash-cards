import {BASE_API} from './config';
// @ts-ignore
import {request} from '../utils/request';

class Nlp {
    public async sent_message(body: object) {
        const url = `${BASE_API}/nlp/calculate_similarity`;
        try {
            // @ts-ignore
            return await request({
                url: url,
                method: 'POST', body
            });

        } catch (error) {
            // @ts-ignore
            console.error(error.message);
        }

    }
}
export const NlpService = new Nlp();
