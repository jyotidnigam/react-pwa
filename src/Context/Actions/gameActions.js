import { gamesByUserService , gameById} from '../../services/gamesService';
 
export async function getGamesByUser(dispatch, userId) {
  try {
    dispatch({ type: 'GAMES_REQUEST' });
    let response = await gamesByUserService(userId)
 
    if (response.data) {
      dispatch({ type: 'GAMES_SUCCESS', payload: response.data });
      return response.data;
    }
    dispatch({ type: 'GAMES_ERROR', error: response.data.error });
    return {error: response.data.error};
  } catch (error) {
    dispatch({ type: 'GAMES_ERROR', error: error });    
    return {error: error.response.data.error};
  }
}

export async function getGameById(dispatch, userId) {
  try {
    dispatch({ type: 'GAME_REQUEST' });
    let response = await gameById(userId)
 
    if (response.data) {
      dispatch({ type: 'GAME_SUCCESS', payload: response.data });
      return response.data;
    }
    dispatch({ type: 'GAME_ERROR', error: response.data.error });
    return {error: response.data.error};
  } catch (error) {
    dispatch({ type: 'GAME_ERROR', error: error });    
    return {error: error.response.data.error};
  }
}