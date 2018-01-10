const Router = require("express").Router();
const GameBoard = require("../db/schema");
const igdb = require("igdb-api-node").default;

//================== API Variables ==================
require("dotenv").config();
const client = igdb(process.env.MASHAPEKEY);
//===================================================

Router.get("/", (req, res) => {
  res.render("game-card");
});

Router.get("/:name", (req, res) => {
  client
    .games(
      {
        filters: {
          "release_dates.date-gt": "2000-12-31",
          "release_dates.date-lt": "2017-01-01"
        },
        limit: 5,
        offset: 0,
        cover: true,
        order: "release_dates.date:desc",
        search: req.params.name
      },
      ["name", "release_dates.date", "rating", "hypes", "cover"]
    )
    .then(data => {
      // response.body contains the parsed JSON response to this query
      console.log(data.body);

      res.render("search-results", {
        cards: data.body
      });
    })
    .catch(error => {
      throw error;
    });
});

Router.put("/add/:id", (req, res) => {

  // GameBoard.create({ id: req.params.id })
  GameBoard.update({ id: req.params.id }, { id: req.params.id }, { upsert: true } )
      .catch(error => {
        throw error;
      })
})

Router.put("/", (req, res) => {});

Router.delete("/", (req, res) => {});

module.exports = Router;
