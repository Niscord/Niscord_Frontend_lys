import React from 'react';
import Root from './routes/root';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Root/>
    </BrowserRouter>
  );
}

export default App;
