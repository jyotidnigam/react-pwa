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



export default () => {
    return <Router>
        <Switch>
            <Route path="/admin/:path?" exact>
                <BaseLayout>
                    <AuthRoute path="/admin/" exact component={Dashboard} />
                    <AuthRoute path="/admin/builder" exact component={Builder} />
                </BaseLayout>
            </Route>
            <AuthRoute path="/" exact component={() => <Redirect to="/login"/>}/>
            <AuthRoute path="/game-demo" exact component={GameComponent} />
            <CommonRoute path="/login" exact component={Login} />
            <CommonRoute path="/register" exact component={Register} />
        </Switch>
    </Router>
}