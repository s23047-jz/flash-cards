import {
    AuthInterface,
    TokenInterface,
    UserInterface
} from "../interfaces/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";


class User {
    tokenData: TokenInterface | object = {}
    userData: UserInterface | object = {}

    public async get() {
        try {
            const storedUserData = await AsyncStorage.getItem("userData");
            const storedTokenData = await AsyncStorage.getItem("tokenData")

            this.userData =  JSON.parse(storedUserData !== null ? storedUserData : '{}')
            this.tokenData = JSON.parse(storedTokenData !== null ? storedTokenData : '{}');
        } catch(e) {}
    }

    public async set(payload: AuthInterface) {
        this.userData = payload.user_data;
        this.tokenData = payload.token_data;
        await AsyncStorage.setItem("userData", JSON.stringify(this.userData));
        await AsyncStorage.setItem("tokenData", JSON.stringify(this.tokenData));
    }

    public async updateUserData(payload: UserInterface) {
        this.userData = payload;
        await AsyncStorage.setItem("userData", JSON.stringify(this.userData));
    }

    public async getUserData() {
        await this.get();
        return this.userData;
    }

    public async isUserAdmin(): Promise<boolean> {
        await this.get();
        if ('is_superuser' in this.userData) return this.userData.is_superuser
        return false
    }

    private async getTokenType(): Promise<string> {
        await this.get();
        if ('token_type' in this.tokenData) return this.tokenData.token_type;
        return ''
    }

    private async  getAccessToken(): Promise<string> {
        await this.get();
        if ('access_token' in this.tokenData) return this.tokenData.access_token;
        return ''
    }

    public async getAuthorization() {
        await this.get();
        const tokenType = await this.getTokenType();
        const accessToken = await this.getAccessToken();
        if (tokenType && accessToken) return `${tokenType} ${accessToken}`
        return '';
    }

    public async isAuthenticated() {
        await this.get();
        const tokenType = await this.getTokenType();
        const accessToken = await this.getAccessToken();
        return (!!tokenType && !!accessToken)
    }

    public async clean() {
        await AsyncStorage.removeItem("userData");
        await AsyncStorage.removeItem("tokenData");
        this.tokenData = this.userData = {};
    }
    
    public getId(): string | undefined {
        return this.userData.id;
    }
}

export const ActiveUser = new User();
