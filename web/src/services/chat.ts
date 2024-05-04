import {BASE_API} from './config';
// @ts-ignore
import {request} from '../utils/request';
class Chat {
    public async sent_message(message: string) {
        const url = `${BASE_API}/chat_gpt/${message}/chat`;
        // @ts-ignore
        const body = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "user", "content": `${message}`}
        ]
    }
        // @ts-ignore
        return await request({
            url: url,
            method: 'POST', body
        });
    }

}

export const ChatService = new Chat();
