import React from 'react';
import { useState } from 'react';
import ExchangeRate from './ExchangeRate';
import axios from 'axios';

const CurrencyConverter = () => {
  const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA', 'PKR', 'INR', 'EUR', 'GBP', 'AUD', 'KWD', 'JPY', 'SAR', 'AED', 'NZD', 'CNY','KRW', 'TRY', 'CAD']
  const [primaryCurrency, setPrimaryCurrency] = useState('BTC') 
  const [secondaryCurrency, setSecondaryCurrency] = useState('BTC') 
  const [amount, setAmount] = useState(1)
  const [result, setResult] = useState(0)

  const [exchangedData, setExchangedData] = useState({
    pCurrency: 'BTC',
    sCurrency: 'BTC',
    exchangeRate: 0
  })
  


  const convert = () => {

    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {from_currency:primaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: secondaryCurrency},
      headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
      }
    };
    
    axios.request(options).then((response) => {
      // console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
      // setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
      setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)

      setExchangedData({
        pCurrency: primaryCurrency,
        sCurrency: secondaryCurrency,
        exchangeRate: response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
    })


    }).catch((error) => {
      console.error(error);
    });
  }

  return (
  <div className='currency-converter'>
    <h2>Currency Converter</h2>
    <div className='input-box'>
    <table>
        <tbody>
          <tr>
            <td className='indicator'>Primary Currency</td>
            <td><input type="number" name={'currency-amount-1'} value={amount} onChange={(e) => setAmount(e.target.value)}/>

            </td>
            <td>
              <select
              value={primaryCurrency}
              name={'currency-option-1'}
              className='currency-option'
              onChange={(e) => setPrimaryCurrency(e.target.value)}>
                
                {currencies.map( (currency, _index)=> (<option key={_index}>{currency}</option>))}

              </select>
            </td>
          </tr>




          <tr>
            <td className='indicator'>Secondary Currency</td>
            <td><input type="number" name={'currency-amount-2'} value={result}
            disabled={true}/>

            </td>
            <td>
              <select
              value={secondaryCurrency}
              name={'currency-option-2'}
              className='currency-option'
              onChange={(e) => setSecondaryCurrency(e.target.value)}>

                {currencies.map( (currency, _index)=> (<option key={_index}>{currency}</option>))}

              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <button id='convert-btn' onClick={convert}>Convert</button>
    </div>
    <ExchangeRate
    exchangedData={exchangedData}/>
  </div>);
};

export default CurrencyConverter;
