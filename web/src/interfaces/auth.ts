export interface TokenInterface {
    access_token?: string
    token_type?: string
}


export interface AuthInterface {
    user_data: UserInterface
    token_data: TokenInterface
}

export interface DeckData{
    deck_data: DeckInterface
}

export interface DeckInterface {
    id?: string;
    user_id?: string;
    title?: string;
    deck_category?: string;
    created_at?: Date;
    updated_at?: Date;
    is_deck_public?: boolean;
    downloads?: number;
}

export interface FlashCardInterface {
    id?: string;
    deck_id?: string;
    card_title?: string;
    card_text?: string;
    is_memorized?: boolean;
}

export interface FlashCardInterfaceMemorized {
    id?: string;
    is_memorized?: boolean;

}

export interface UserInterface {
    id?: string;
    email?: string;
    username?: string;
    password?: string;
    created_at?: Date;
    updated_at?: Date;
    rank?: number;
    created_decks?: number;
    public_decks?: number,
    avatar?: string;
    active?: boolean;
    role?: string;
    is_superuser?: boolean;
}

