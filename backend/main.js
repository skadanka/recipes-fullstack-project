

require("dotenv").config();
var data = require('./recipe4000.json')
//#region express configures
var express = require("express");
var path = require("path");
var logger = require("morgan");
const session = require("client-sessions");
const DButils = require("./routes/utils/DButils");
var cors = require('cors')

var app = express();
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json
app.use(
  session({
    cookieName: "session", // the cookie key name
    //secret: process.env.COOKIE_SECRET, // the encryption key
    secret: "template", // the encryption key
    duration: 24 * 60 * 60 * 1000, // expired after 20 sec
    activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration,
    cookie: {
      httpOnly: false,
    }
    //the session will be extended by activeDuration milliseconds
  })
);
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files
//local:
// app.use(express.static(path.join(__dirname, "dist")));

app.get("/",function(req,res)
{ 
  res.sendFile(__dirname+"/index.html");
});


const corsConfig = {
  origin: true,
  credentials: true
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

var port = process.env.PORT || "80"; //local=3000 remote=80
//#endregion
const user = require("./routes/user");
const recipes = require("./routes/recipes");
const auth = require("./routes/auth");


//#region cookie middleware
app.use(function (req, res, next) {
  if (req.session && req.session.username) {
    DButils.execQuery("SELECT username FROM users")
      .then((users) => {
        if (users.find((x) => x.username === req.session.username)) {
          req.username = req.session.username;
        }
        next();
      })
      .catch((error) => next());
    } else {
      next();
    }
  });
//#endregion

// ----> For cheking that our server is alive
app.get("/alive", (req, res) => res.send("I'm alive"));

// app.use(function (req, res, next) {
//   res.send({
//     recipes: [
//     {
//       id:0, 
//       title: "Food example",
//       readyInMinutes: 35.0,
//       image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=780&q=80",
//       aggregateLikes: 100,
//       glutenFree: true,
//       isVegan: true,
//       isVegetarian: false,
//     },
//     {
//       id:1, 
//       title: "Food example",
//       readyInMinutes: 35.0,
//       image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=781&q=80",
//       aggregateLikes: 100,
//       glutenFree: true,
//       isVegan: false,
//       isVegetarian: true,

//     },
//     {
//       id:2, 
//       title: "Food example",
//       readyInMinutes: 35.0,
//       image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
//       aggregateLikes: 100,
//       glutenFree: true,
//       isVegan: true,
//       isVegetarian: true,
//     }
//   ],
//   recipeInfo: data

// })
//   return;
// })

// Routings
app.use("/users", user);
app.use("/recipes", recipes);
app.use(auth);

// Default router
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send({ message: err.message, success: false });
});



const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

process.on("SIGINT", function () {
  if (server) {
    server.close(() => console.log("server closed"));
  }
  process.exit();
});
