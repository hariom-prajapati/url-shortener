const express = require("express");
const router = express.Router();
const URLs = require("./../models/URLs");

// @route GET /{code}
// @desc redirect to full URL
// @access Public
router.get('/:code', async (req, res) => {
  try {
    // get the code
    const code = req.params.code;

    // check if the requested URL is already exists in DB. If yes then return the URL from DB
    const ifCodeExists = await URLs.findOne({ urlCode: code });
    if (ifCodeExists) {
      return res.redirect(ifCodeExists.fullURL);
    } else {
      return res.status(404).json('URL not found');
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json('Server Error');
  }
})

module.exports = router;
