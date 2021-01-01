import React, { useReducer } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Login from '../components/Login';
import Register from '../components/Register';
import GameComponent from '../components/GameComponent';
import AuthRoute from './AuthRoute';
import CommonRoute from './CommonRoute';
import BaseLayout from '../components/BaseLayout';
import Dashboard from '../components/Dashboard';
import GameTable from '../components/GameTable/gameTable';

export default () => {

    return <Router>
        <Switch>
            <Route path="/admin/:path?" exact>
                <BaseLayout>
                    <AuthRoute path="/admin/" exact component={Dashboard} />
                    <AuthRoute path="/admin/games" exact component={GameTable} />
                </BaseLayout>
            </Route>
            <AuthRoute path="/game-demo/:id" exact component={GameComponent} />
            <CommonRoute path="/" exact component={Login} />
            <CommonRoute path="/register" exact component={Register} />
        </Switch>
    </Router>
}