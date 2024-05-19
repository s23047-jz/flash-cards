export interface UpdateUserInterface {
    username?: string,
    email?: string,
    password?: string,
    re_password?: string,
    current_password?: string
};

export interface UserStatsInterface {
    id?: string,
    username?: string,
    avatar?: string,
    ranking?: number,
    created_decks?: number,
    public_decks?: number
}