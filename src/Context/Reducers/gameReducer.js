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

    case "CREATE_GAME_REQUEST":
      return {
        ...gameInitialState,
        loading: true
      };
    case "CREATE_GAME_SUCCESS":
      return {
        ...gameInitialState,
        games: [...gameInitialState.games, action.payload],
        loading: false
      };
    case "CREATE_GAME_ERROR":
      return {
        ...gameInitialState,
        loading: false,
        errorMessage: action.error
      };
      
    case "DELETE_GAME_REQUEST":
      return {
        ...gameInitialState,
        loading: true
      };
    case "DELETE_GAME_SUCCESS":
      return {
        ...gameInitialState,
        games: gameInitialState.games.filter((a) => a.gameSlug !== action.payload),
        loading: false
      };
    case "DELETE_GAME_ERROR":
      return {
        ...gameInitialState,
        loading: false,
        errorMessage: action.error
      };

    case "UPDATE_GAME_REQUEST":
      return {
        ...gameInitialState,
        loading: true
      };
    case "UPDATE_GAME_SUCCESS":
      const i = gameInitialState.games.findIndex((g)=>g.gameSlug === action.payload.gameSlug)
      gameInitialState.games.splice(i, 1, action.payload);
      return {
        ...gameInitialState,
        games: gameInitialState.games,
        loading: false
      };
    case "UPDATE_GAME_ERROR":
      return {
        ...gameInitialState,
        loading: false,
        errorMessage: action.error
      };
          
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};