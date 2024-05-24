import { DecksService } from '../../services/decks';
async function fetchAllFlashcards(deckId, navigation) {
  try {
    console.log('POBRANO KARTY Z TALII:', deckId);
    const data = await DecksService.read_deck_cards_by_id(deckId, navigation);
    return data;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    throw new Error('Nie udało się pobrać kart z talii');
  }
}
export default fetchAllFlashcards;
