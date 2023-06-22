require("dotenv").config();
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
//   recipeInfo:{
//     "id": 51321,
//     "Preview": {
//       "id": 716429,
//       "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
//       "readyInMinutes": 45.2,
//       "image": "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
//       "popularity": 420,
//       "vegan": true,
//       "vegetarian": false,
//       "glutenFree": false,
//       "summary": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be a good recipe to expand your main course repertoire."
//     },
//     "analyzedInstructions": [],

//     "extendedIngredients": [
//       {
//         "id": 1102047,
//         "aisle": "Spices and Seasonings",
//         "image": "salt-and-pepper.jpg",
//         "consistency": "solid",
//         "name": "Kosher salt and pepper",
//         "nameClean": "salt and pepper",
//         "Original": "Kosher slat and freshly ground pepper",
//         "OriginalName": "Kosher slat and freshly ground pepper",
//         "amount": 4,
//         "unit": "servings",
//         "meta": [
//           [
//             "freshly ground"
//           ]
//         ],
//         "measures": {
//           "metric": {
//             "amount": 1,
//             "unit long": "milliliters",
//             "unit short": "ml"
//           },
//           "us": {
//             "amount": 1,
//             "unit long": "cups",
//             "unit short": "cups"
//           }
//         }
//       }
//     ],
//     "instructions": [
//       {
//         "name": "Prep",
//         "steps": [
//           {
//             "number": 2,
//             "step": "Rub the steaks with the lime juice and salt and pepper. Let stand for 10 minutes.",
//             "ingredients": [
//               {
//                 "id": 18372,
//                 "name": "pecans",
//                 "localizedName": "pecans",
//                 "image": "white-poweder.jpg"
//               }
//             ],
//             "equipment": [
//               {
//                 "id": 404784,
//                 "image": "oven.jpg",
//                 "name": "oven"
//               }
//             ],
//             "length": {
//               "number": 10,
//               "unit": "minutes"
//             }
//           }
//         ]
//       }
//     ],
//     "userData": {
//       "favorite": true,
//       "watched": false
//     }
//   }

  
// }
  
//   )
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
