import React from 'react';
import CurrencyConverter from './components/CurrencyConverter';
import Newsfeed from './components/Newsfeed';

const App = () => {
  return(<div className='app'>
    <CurrencyConverter />
    <Newsfeed />
  
  </div>);
};

export default App;
