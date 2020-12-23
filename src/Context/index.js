import React, { useReducer } from "react";
import { initialState, AuthReducer } from './Reducers/authReducer';
 
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
    return (
      <AuthStateContext.Provider value={user}>
        <AuthDispatchContext.Provider value={dispatch}>
          {children}
          </AuthDispatchContext.Provider>
      </AuthStateContext.Provider>
    );
  };