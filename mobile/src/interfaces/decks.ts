export interface DeckListInterface {
    id?: number | string,
    title: string,
    deck_category: string
    downloads: number
    username?: string
    avatar?: string
    created_at?: Date
}

export interface UserListInterface {
    id?: number | string,
    rank: number,
    avatar?: string,
    username: string,
    shared: number
}
