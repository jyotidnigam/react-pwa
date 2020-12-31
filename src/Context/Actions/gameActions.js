import { gamesByUserService , gameById, gameUploadService, fetchAllGameService,
deleteGameService, updateGame} from '../../services/gamesService';
 
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

export async function fetchAllGames(dispatch) {
  try {
    dispatch({ type: 'GAMES_REQUEST' });
    let response = await fetchAllGameService()
 
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

export async function createGame(dispatch, data) {
  try {
    dispatch({ type: 'CREATE_GAME_REQUEST' });
    let response = await gameUploadService(data)
 
    if (response.data) {
      dispatch({ type: 'CREATE_GAME_SUCCESS', payload: response.data });
      return response.data;
    }
    dispatch({ type: 'CREATE_GAME_ERROR', error: response.data.error });
    return {error: response.data.error};
  } catch (error) {
    dispatch({ type: 'CREATE_GAME_ERROR', error: error });    
    return {error: error.response.data.error};
  }
}

export async function updateGame(dispatch, data) {
  try {
    dispatch({ type: 'UPDATE_GAME_REQUEST' });
    let response = await gameUploadService(data)
 
    if (response.data) {
      dispatch({ type: 'UPDATE_GAME_SUCCESS', payload: response.data });
      return response.data;
    }
    dispatch({ type: 'UPDATE_GAME_ERROR', error: response.data.error });
    return {error: response.data.error};
  } catch (error) {
    dispatch({ type: 'UPDATE_GAME_ERROR', error: error });    
    return {error: error.response.data.error};
  }
}

export async function deleteGame(dispatch, data) {
  
  try {
    dispatch({ type: 'DELETE_GAME_REQUEST' });
    let response = await deleteGameService(data)
 
    if (response.data) {
      dispatch({ type: 'DELETE_GAME_SUCCESS', payload: data });
      return response.data;
    }
    dispatch({ type: 'DELETE_GAME_ERROR', error: response.data.error });
    return {error: response.data.error};
  } catch (error) {
    dispatch({ type: 'DELETE_GAME_ERROR', error: error });    
    return {error: error.response.data.error};
  }
}