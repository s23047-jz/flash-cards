import {
    AuthInterface,
    TokenInterface,
    UserInterface
} from "../interfaces/auth";
import {BASE_API} from "./config";



class User {
    tokenData: TokenInterface = {}
    userData: UserInterface = {}

    constructor() {
        try {
            const storedUserData = JSON.parse(localStorage.getItem("userData") || '{}');
            const storedTokenData = JSON.parse(localStorage.getItem("tokenData") || '{}');

            this.userData = storedUserData;
            this.tokenData = storedTokenData;
        } catch(e) {}
    }


    public set(payload: AuthInterface) {
        this.userData = payload.user_data
        this.tokenData = payload.token_data

        localStorage.setItem("userData", JSON.stringify(this.userData))
        localStorage.setItem("tokenData", JSON.stringify(this.tokenData))
    }

    public isUserAdmin(): boolean {
        return this.userData?.is_superuser || false
    }

    public async get_users_ranking(): Promise<any> {
        const url = `${BASE_API}/api/users/users_ranking/`;

        try {
            const response = await  fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `${this.getAuthorization()}`
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
    

    getUserData(): UserInterface {
        return this.userData
    }

    private getTokenType(): string | undefined {
        return this.tokenData.token_type;
    }

    public getAccessToken(): string | undefined {
        return this.tokenData.access_token;
    }

    public getId(): string | undefined {
        return this.userData.id;
    }


    public getAuthorization(): string | undefined {
        return `${this.getTokenType()} ${this.getAccessToken()}`
    }



    public clean() {
        localStorage.removeItem("userData")
        localStorage.removeItem("tokenData")
        localStorage.removeItem("deckData");
    }
}

export const ActiveUser = new User();
