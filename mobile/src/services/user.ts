import {
    AuthInterface,
    TokenDataType,
    UserDataType
} from "../interfaces/auth";


export default class ActiveUser {
    tokenData: TokenDataType = {}
    userData: UserDataType = {}

    constructor() {
        try {
            const storedUserData = JSON.parse(localStorage.getItem("userData") || '{}');
            const storedTokenData = JSON.parse(localStorage.getItem("tokenData") || '{}');

            this.userData = storedUserData;
            this.tokenData = storedTokenData;
        } catch(e) {}
    }


    set(payload: AuthInterface) {
        this.userData = payload.user_data
        this.tokenData = payload.token_data

        localStorage.setItem("userData", JSON.stringify(this.userData))
        localStorage.setItem("tokenData", JSON.stringify(this.tokenData))
    }

    isUserAdmin(): boolean {
        return 'is_superuser' in this.userData && this.userData.is_superuser
    }

    getUserData(): UserDataType {
        return this.userData
    }

    getTokenData(): TokenDataType {
        return this.tokenData
    }

    logout() {
        localStorage.removeItem("userData")
        localStorage.removeItem("tokenData")
    }
}
