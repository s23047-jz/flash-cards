import { DecksService } from '../../services/decks';
import { ActiveUser } from '../../services/user';

async function FetchDownloadedDecks(navigation) {
  try {
    console.log('Pobrano pobrane talie');
    const { id } = await ActiveUser.getUserData();
    const data = await DecksService.get_downloaded_decks(id, navigation);
    
    return data; // Zwrócenie pobranych danych
    console.log(data)
  } catch (error) {
    console.error('Error checking authentication status:', error);
    throw new Error('Nie udało się pobrać danych o talii');
  }
}

export default FetchDownloadedDecks;
