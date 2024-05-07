import {BASE_API} from './config';
// @ts-ignore
import {request} from '../utils/request';

class Chat {
    public async sent_message(message: string) {
        const url = `${BASE_API}/chat_gpt/chat`;
        const body = JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "user", "content": message}
            ]
        });

        try {
            console.log('sending message to chat');
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });

            if (!response.ok) {
                throw new Error(`Failed to send message: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('answer:', data);
            return data;
        } catch (error) {
            console.error("Failed connect with chatGPT", error);
            throw error;
        }
    }
}

export const ChatService = new Chat();
