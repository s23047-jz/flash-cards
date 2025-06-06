export interface TokenInterface {
    access_token: string
    token_type: string
};

export interface UserInterface {
    id: string
    email: string
    username: string
    created_at: Date
    updated_at: Date
    avatar: string
    active: boolean
    role: string
    is_superuser: boolean
};

export interface AuthInterface {
    user_data: UserInterface
    token_data: TokenInterface
};
