import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Newsfeed = () => {
  const [articles, setArticles] = useState(null)

  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'https://crypto-news-live3.p.rapidapi.com/news',
      headers: {
        'x-rapidapi-host': 'crypto-news-live3.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
      }
    };
    
    axios.request(options).then((response) => {
      // console.log(response.data)
      setArticles(response.data)

  }).catch((error) => {
      console.error(error)
  })
  }, [])


  const first7Articles = articles?.slice(0,15)

    return (
        <div className="news-feed">
            <h2>News Feed</h2>
            <ol>
            {first7Articles?.map((article, _index) => (
                <div key={_index}>
                    <a href={article.url}><li className='lists'>{article.title}</li></a>
                </div>))}
            </ol>
            
        </div>
    )
}

export default Newsfeed