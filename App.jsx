// App.js

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');

  const shortenURL = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/shorten', { longURL });
      setShortURL(response.data.shortURL);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <input 
        type="text" 
        placeholder="Enter long URL" 
        value={longURL} 
        onChange={(e) => setLongURL(e.target.value)} 
      />
      <button onClick={shortenURL}>Shorten URL</button>
      {shortURL && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortURL} target="_blank" rel="noopener noreferrer">{shortURL}</a>
        </div>
      )}
    </div>
  );
}

export default App;