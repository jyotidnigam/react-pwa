import React, { useReducer } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Login from '../components/Login';
import Register from '../components/Register';
import GameComponent from '../components/GameComponent';
import AuthRoute from './AuthRoute';
import CommonRoute from './CommonRoute';
import BaseLayout from '../components/BaseLayout';
import Dashboard from '../components/Dashboard';
import Builder from '../components/Builder';
import GameTable from '../components/GameTable';
import { GameStateContext } from '../Context'
import { GamesReducer, gameInitialState } from "../Context/Reducers/gameReducer";

export default () => {
    const [games, gamesDispatch] = useReducer(GamesReducer, gameInitialState);
    return <Router>
        <Switch>
        <GameStateContext.Provider value={{games, gamesDispatch}}>
            <Route path="/admin/:path?" exact>
                <BaseLayout>
                
                        <AuthRoute path="/admin/" exact component={Dashboard} />
                        <AuthRoute path="/admin/builder" exact component={Builder} />
                        <AuthRoute path="/admin/games" exact component={GameTable} />
                       
                </BaseLayout>
            </Route>
            
            <AuthRoute path="/" exact component={() => <Redirect to="/login"/>}/>
            {/* <GameStateContext.Provider value={{games, gamesDispatch}}> */}
            <AuthRoute path="/game-demo/:id" exact component={GameComponent} />
            {/* </GameStateContext.Provider> */}
       
            <CommonRoute path="/login" exact component={Login} />
            <CommonRoute path="/register" exact component={Register} />
             </GameStateContext.Provider>
        </Switch>
    </Router>
}