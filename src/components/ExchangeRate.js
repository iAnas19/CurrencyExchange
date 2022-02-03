import React from 'react';

const ExchangeRate = ({exchangedData}) => {
  return(
  <div className='exchange-rate'>
    <h3>Exchange Rate</h3>
    <h1 className='green'>{exchangedData.exchangeRate}</h1>
    <p>{exchangedData.pCurrency} to {exchangedData.sCurrency}</p>
  </div>);
};

export default ExchangeRate;
