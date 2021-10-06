const express = require("express");
const router = express.Router();
const validUrl = require('valid-url');
const URLs = require("./../models/URLs");
const { nanoid } = require("nanoid");

// generate a short code
const generateShortURLCode = async (length = 5) => {
  const code = nanoid(length);

  // Check if the code already exists in the DB
  const ifExists = await URLs.findOne({ urlCode: code });
  if (ifExists) {
    generateShortURLCode();
  }
  return code;
}

// @route POST api/shorten
// @desc generate shorten url
// @access Public
router.post('/', async (req, res) => {
  const {
    url
  } = req.body // destructure the longUrl from req.body.url

  try {
    // throw error if the URL is not valid
    if (!validUrl.isUri(url)) {
      return res.status(400).json('URL is not valid');
    }

    // check if the requested URL is already exists in DB. If yes then return the URL from DB
    const ifExistsFullURL = await URLs.findOne({ fullURL: url });
    if (ifExistsFullURL) {
      return res.status(200).json(ifExistsFullURL.shortURL);
    }

    // Generate a new short code
    const shortURLCode = await generateShortURLCode();

    // Prepare an object to save
    const urlObject = {
      fullURL: url,
      shortURL: `${req.protocol}://${req.headers.host}/${shortURLCode}`,
      urlCode: shortURLCode
    }

    // save the new URL object
    const URLSave = new URLs(urlObject);
    await URLSave.save();

    // return the newly generated URL
    return res.status(200).json(URLSave.shortURL);
  } catch (err) {
    console.log(err);
    return res.status(500).json('Server Error');
  }
})

module.exports = router;
