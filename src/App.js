import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import ScrollTop from './components/ScrollTop/ScrollTop';

const App = () => {
  return (
    <div>
      <Header />
      <Main />

      <ScrollTop showBelow={250} />
    </div>
  );
};

export default App;
