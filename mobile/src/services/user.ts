import {
    AuthInterface,
    TokenInterface,
    UserInterface
} from "../interfaces/auth";


class User {
    tokenData: TokenInterface | object = {}
    userData: UserInterface | object = {}

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
        if ('is_superuser' in this.userData) return this.userData.is_superuser
        return false
    }

    getUserData(): UserInterface | object {
        return this.userData
    }

    private getTokenType(): string {
        if ('token_type' in this.tokenData) return this.tokenData.token_type;
        return ''
    }

    private getAccessToken(): string {
        if ('access_token' in this.tokenData) return this.tokenData.access_token;
        return ''
    }

    public getAuthorization(): string {
        return `${this.getTokenType()} ${this.getAccessToken()}` || '';
    }

    public isAuthenticated() {
        return (!!this.getTokenType() && !!this.getAccessToken())
    }

    public clean() {
        localStorage.removeItem("userData")
        localStorage.removeItem("tokenData")
    }
}

export const ActiveUser = new User();
