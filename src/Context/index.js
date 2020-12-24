import React, { useReducer } from "react";
import { initialState, AuthReducer } from './Reducers/authReducer';
import { GamesReducer, gameInitialState } from "./Reducers/gameReducer";
 
const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();
export const GameStateContext = React.createContext();

export function useAuthState() {
    const context = React.useContext(AuthStateContext);
    if (context === undefined) {
      throw new Error("useAuthState must be used within a AuthProvider");
    }
   
    return context;
}

export function useGameState() {
  const context = React.useContext(GameStateContext);
  if (context === undefined) {
    throw new Error("useGameState must be used within a AuthProvider");
  }
  
  return context;
}


  export function useAuthDispatch() {
    const context = React.useContext(AuthDispatchContext);
    if (context === undefined) {
      throw new Error("useAuthDispatch must be used within a AuthProvider");
    }
   
    return context;
  }


  export const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);
    const [games, gamesDispatch] = useReducer(GamesReducer, gameInitialState);
    return (
      <AuthStateContext.Provider value={user}>
        <AuthDispatchContext.Provider value={dispatch}>
          <GameStateContext.Provider value={{ games, gamesDispatch}}>
          {children}
          </GameStateContext.Provider>
          </AuthDispatchContext.Provider>
      </AuthStateContext.Provider>
    );
  };