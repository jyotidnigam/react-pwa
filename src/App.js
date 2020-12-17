import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "tabler-react/dist/Tabler.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
