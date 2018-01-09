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

Router.post('/', (req, res) => {

})

Router.put('/', (req, res) => {

})

Router.delete('/', (req, res) => {

})


module.exports = Router;
