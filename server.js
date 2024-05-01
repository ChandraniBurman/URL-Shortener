// server.js

const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const validUrl = require('valid-url');
const cors = require("cors")

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
const PORT = process.env.PORT || 5000;

// Map to store shortened URLs and their corresponding long URLs
const urlMap = new Map();

app.use(bodyParser.json());

// Shorten URL endpoint
app.post('/api/shorten', (req, res) => {
  const { longURL } = req.body;

  // Validate the long URL
  if (!validUrl.isUri(longURL)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  let shortURL;
  do {
    shortURL = shortid.generate().slice(0, 6); // Generate a unique short code
  } while (urlMap.has(shortURL));

  urlMap.set(shortURL, longURL);
  res.json({ shortURL: `${req.protocol}://${req.get('host')}/${shortURL}` });
});

// Redirect to original URL endpoint
app.get('/:shortURL', (req, res) => {
  const longURL = urlMap.get(req.params.shortURL);
  if (longURL) {
    res.redirect(longURL);
  } else {
    res.status(404).json({ error: 'Shortened URL not found' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));