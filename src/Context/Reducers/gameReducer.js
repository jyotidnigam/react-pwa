export const gameInitialState = {
  games: [],
  loading: false,
  errorMessage: null,
  game: {},
};
 
export const GamesReducer = (gameInitialState, action) => {
  switch (action.type) {
    case "GAMES_REQUEST":
      return {
        ...gameInitialState,
        loading: true
      };
    case "GAMES_SUCCESS":
      return {
        ...gameInitialState,
        games: action.payload,
        loading: false
      };
    case "GAMES_ERROR":
      return {
        ...gameInitialState,
        loading: false,
        errorMessage: action.error
      }; 
    
    case "GAME_REQUEST":
      return {
        ...gameInitialState,
        loading: true
      };
    case "GAME_SUCCESS":
      return {
        ...gameInitialState,
        game: action.payload,
        loading: false
      };
    case "GAME_ERROR":
        return {
          ...gameInitialState,
          loading: false,
          errorMessage: action.error
        }; 
      
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};