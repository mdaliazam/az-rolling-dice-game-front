import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import GameBody from './components/GameBody';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <GameBody />
      {/* <Footer /> */}
    </>
  );
}

export default App;
