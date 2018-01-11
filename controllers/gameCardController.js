const Router = require("express").Router();
const GameBoard = require("../db/schema").GameBoard;
const FullBoard = require("../db/schema").FullBoard;
const igdb = require("igdb-api-node").default;

//================== API Variables ==================
require("dotenv").config();
const client = igdb(process.env.MASHAPEKEY);
//===================================================

Router.get("/", (req, res) => {
  res.render("game-card");
});

Router.get("/user/gameboard", (req, res) => {
  GameBoard.find({}).then(allItems => {
    let idArray = []
    let commArray = []
    allItems.forEach((item, index) => commArray.push(item.review));
    allItems.forEach((item, index) => idArray.push(item.id));
    // idArray contains all the .id values from allItems
    client
      .games(
        {
          ids: idArray
        },
        ["name", "release_dates.date", "rating", "hypes", "cover"]
      )
      .then(data => {
        // response.body contains the parsed JSON response to this query
        res.render("user-screen", { cards: data.body });
      })
      .catch(error => {
        throw error;
      });
  });
});

Router.post("/", (req, res) => {
  console.log(req.body.gameName)
  client
    .games(
      {
        filters: {
          "release_dates.date-gt": "2000-12-31",
          "release_dates.date-lt": "2017-01-01"
        },
        limit: 10,
        offset: 0,
        order: "release_dates.date:desc",
        search: req.body.gameName
      },
      ["name", "cover"]
    )
    .then(data => {
      // response.body contains the parsed JSON response to this query
      res.render("search-results", {
        cards: data.body
      });
    })
    .catch(error => {
      throw error;
    });
});

Router.put("/add/:id", (req, res) => {
  GameBoard.update(
    { id: req.params.id },
    { id: req.params.id,
      review: "no review"},
    { upsert: true }
  )
    .catch(error => {
      throw error;
    });
});

Router.put("/add/gameboard/changeid/:id", (req, res) => {
  GameBoard.findOneAndUpdate({ id: req.params.id }, req.body.GameBoard)
  .then(() => {
    res.redirect('/user/gameboard')
  })
  .catch(error => {
    throw error;
  });
});

Router.delete("/add/:id", (req, res) => {
  let id = parseInt(req.params.id)
  GameBoard.findOneAndRemove({ id: id })
  .then(() => (
    res.redirect('/user/gameboard')
  ))
  .catch((error) => {
    throw error
  })
});

module.exports = Router;
