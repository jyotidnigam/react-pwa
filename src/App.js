import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context';
import Routers from './Router';
import "tabler-react/dist/Tabler.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

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
