const Router = require("express").Router();
const Card = require("../db/schema");
const igdb = require("igdb-api-node").default;

//================== API Variables ==================
require("dotenv").config();
const client = igdb(process.env.MASHAPEKEY);
//===================================================

Router.get("/", (req, res) => {
  res.render("game-card");
});

Router.get("/:name", (req, res) => {
  client;
  client
    .games(
      {
        filters: {
          "release_dates.date-gt": "2010-12-31",
          "release_dates.date-lt": "2017-01-01"
        },
        limit: 5,
        offset: 0,
        order: "release_dates.date:desc",
        search: "Doom"
      },
      ["name", "release_dates.date", "rating", "hypes", "cover"]
    )
    .then(res => {
      // response.body contains the parsed JSON response to this query
      console.log(res.body);
    })
    .catch(error => {
      throw error;
    });
});

module.exports = Router;
