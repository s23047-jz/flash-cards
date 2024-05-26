export interface DeckListInterface {
    id: string,
    title: string,
    deck_category: string
    downloads: number
    username?: string
    avatar?: string
    created_at?: Date,
    navigate?: () => void
}

export interface UserListInterface {
    id: string,
    rank: number,
    avatar?: string,
    username: string,
    shared: number,
    navigate?: (userId: string) => void
}
