const express = require("express");
const router = express.Router();
const request = require("request");
require("dotenv").config();

router.get("/", (req, res, next) => {
  const url = `http://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}`;
  request.get(url, (err, response, body) => {
    if (err) {
      console.error(err);
    }

    body = JSON.parse(body);
    const imgUrl = body.data.image_original_url;

    res.render("index", { title: "In A GIFFY", imgUrl: imgUrl });
  });
});

router.get("/search", (req, res, next) => {
  res.render("search");
});

router.post("/search", (req, res, next) => {
  const query = req.body["giphy-query"];
  const url = `http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${query}&limit=20&offset=0&rating=g&lang=en`;

  request.get(url, (err, response, body) => {
    if (err) {
      console.error(err);
    }

    body = JSON.parse(body);

    const gifsData = info.data;
    const searchResultUrl = gifsData.images.fixed_height.url;

    res.render("search", { searchResultUrl: searchResultUrl });
  });
});

module.exports = router;
