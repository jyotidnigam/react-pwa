import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './Context';
import Routers from './Router';

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
