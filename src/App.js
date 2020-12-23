import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context';
import Routers from './Router';
import './App.scss';
import "tabler-react/dist/Tabler.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <AuthProvider>
        <Routers />
      </AuthProvider>
    </div>
  </BrowserRouter>
  );
}

export default App;
