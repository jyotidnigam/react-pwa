import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const AuthRoute = props => {
    let token = localStorage.getItem('token');
    return (token ?<Route {...props}/>: <Redirect to={`/login`}/>)
}

export default AuthRoute;