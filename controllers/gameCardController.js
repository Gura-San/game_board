const Router    = require("express").Router();
const GameBoard = require("../db/schema").GameBoard;
const ClipBoard = require("../db/schema").ClipBoard;
const MemoBoard = require("../db/schema").MemoBoard;
const igdb      = require("igdb-api-node").default;

//================== API Variables ==================
require("dotenv").config();
const client = igdb(process.env.MASHAPEKEY);
//===================================================

// main page route

Router.get("/", (req, res) => {
  res.redirect("/user/gameboard");
});

// userboard route with board seed function

Router.get("/user/gameboard", (req, res) => {
  //I would 
  ClipBoard.find({}).then(allItems => {

    // This code can be refactored with .map
    var idArray = [];
    allItems.forEach((item, index) => {
      idArray.push(item.id)
    })
    // .map refactor
    // let idArray = allItems.map(item => item.id)


    // idArray contains all the .id values from allItems    
    client
    .games(
      {
        ids: idArray // I think this is still fetching all a series of games even if    
                     // this is empty
      },
      [
        "name",
        "cover",
        "storyline",
        "aggregated_rating",
        "developers",
        "first_release_date"
      ]
    )
    .then(data => {
      data.body.forEach(game => {
        // I might move this and the query before to its own route
        // that specializes in fetching all the games
        GameBoard.create( game )
      })
    }).then(() => {
      console.log(GameBoard.body) // This will be undefined
      // You instead want to query using the model
      GameBoard.find({}).then(gameBoards => {
        console.log(gameBoards)
        res.render("user-screen", { cards: gameBoards });
      })
    })
    .catch(error => {
      console.error('Error in connecting to igdb')
      throw error;
    });
  })
    ClipBoard.remove({})
});



// search route with search result seed function

Router.post("/", (req, res) => {
//The POST route really should be for the creation of a resource.

  client
    .games(
      {
        filters: {
          "release_dates.date-gt": "2000-12-31",
          "release_dates.date-lt": "2017-01-01"
        },
        limit: 3,
        offset: 0,
        order: "release_dates.date:desc",
        search: req.body.gameName
      },
      ["name", "cover.cloudinary_id"]
    )
    // response.body contains the parsed JSON response to this query
    .then(data => {
      // console.log(data.body);
      res.render("search-results", {
        cards: data.body
      });
    })
    .catch(error => {
      throw error;
    });
});

// route to add cards to the userboard with duplicate check

Router.put("/add/:id", (req, res) => {
  // Separating your Create / Update logic will make your controller code more RESTful
  ClipBoard.update(
    { id: req.params.id },
    { id: req.params.id },
    { upsert: true }
  ).catch(error => {
    throw error;
  });
  // this method is missing a response
});

// card id update

Router.put("/add/gameboard/changeid/:id", (req, res) => {
  console.log(req.params.id)
  GameBoard.findOneAndUpdate({ id: req.params.id }, req.body.GameBoard)
    .then(() => {res.redirect("/user/gameboard") })
    .catch(error => {throw error });
});

// delete card route

Router.delete("/add/:id", (req, res) => {
  let id = parseInt(req.params.id);
  GameBoard.findOneAndRemove({ id: id })
  // GameBoard.findOneAndRemove({ id}) //ES6+ shorthand
    .then(() => res.redirect("/user/gameboard"))
    .catch(error => {throw error});
});

module.exports = Router;
