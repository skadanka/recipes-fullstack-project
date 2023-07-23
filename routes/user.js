var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");
const recipes = require("./recipes");



// Middleware overriding response.send, in-order to invoke actions
// after the process of route./recipes is fulfiled
// Iterate of recipes array, and get the information per user about
// recentaly watched recipes and favorites recipes, and fo each recipe the details
// inside the userData object. boolean values for favorites and watched.
function modifyResponseBody(req, res, next) {
  
  const username = req.username;
  // Store the original send method
  const _send = res.send;
  // Override it
  res.send = async function (data) {
    let recipes = data.recipes;
    if(data.success == false){
      res.send = _send;
      next({message: "Sorry, recipes are not available at the moment.", status: data.status});
      return;
    }
    const favorites = new Promise((resolve, reject) => {
        user_utils.getFavoriteRecipes(username, 'NULL').then((recipes_favorites_ids) => {
          console.log("Favorites recipes", recipes_favorites_ids)
          resolve(recipes_favorites_ids);
        }).catch( (error) => {
          reject(`Could not get favorites recipes`);
        });
    })

    const watched = new Promise((resolve, reject) => {
      user_utils.getWatchedRecipes(username, 'NULL').then((recipes_watched_ids) => {
        console.log("Watched Recipes", recipes_watched_ids);
        resolve(recipes_watched_ids);
      }).catch((error) => {
        reject("Could not get watched recipes")
      })
    }) 
    
    await watched;
    await favorites;

    for(let i = 0; i < recipes.length; i++){
      let userData = {
        favorite: false,
        watched: false
      };

      recipes[i].userData = userData;
      await favorites.then((values) => { 
        values.forEach(fav => {
          if(parseInt(fav.recipe_id, 10) === parseInt(recipes[i].id, 10)) {
              // console.log(fav.recipe_id);
              // console.log(typeof(fav.recipe_id));
              // console.log(fav.recipe_id === recipes[i].id);
              recipes[i].userData.favorite = true;
              return;
            }
        })
        // recipes[i].userData.favorite = false;
      });
        
      await watched.then((values) => {
        values.forEach(fav => {
          if(parseInt(fav.recipe_id, 10) === parseInt(recipes[i].id, 10)) {
            recipes[i].userData.watched = true;
            return;
          }
        })
        // recipes[i].userData.watched = false;
      });

    }
    // Reset it
    res.send = _send;
    // Actually send the response
    res.send({recipes: recipes});
  }
  next();
}

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.username) {
    DButils.execQuery("SELECT username FROM users")
    .then((users) => {
      if (users.find((x) => x.username === req.session.username)) {
        req.username = req.session.username;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


// Plug the middleware, for Authenticated users
// excluding post method requests.
router.use((req, res, next) => {
  // console.log('route', req._parsedOriginalUrl.path);
  // console.log('method', req.method);
  if(req.method === 'POST' || 
    req._parsedOriginalUrl.path.includes("created")){
    next();
  }else{
    modifyResponseBody(req, res, next);
  }
})

/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const username = req.session.username;
    const recipe_id = req.body.recipeId;
    if(!req.query){
      throw {status: 400, message: "Missing, No body passed with request"};
    }
    if(!recipe_id || recipe_id === ""){
      throw {status: 400, message: "Missing, RecipeId is empty"};
    }
    if(String(recipe_id).match(/^[0-9]+$/) == null){
      throw {status: 400, message: "Invalid, Recipe id most be a number"};
    }
    await user_utils.markAsFavorite(username,recipe_id)


    res.status(200).send("The Recipe successfully saved as favorite");

    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req,res,next) => {
  try{
    const username = req.session.username;
    var favorite_recipes_ids = [];
    const recipes_id = await user_utils.getFavoriteRecipes(username);
    recipes_id.map((element) => favorite_recipes_ids.push(element.recipe_id)); //extracting the recipe ids into array
    if(favorite_recipes_ids.length == 0) {
      res.status(204).send("Yet to add Favorites recipes");
    } else {
      const favorite_recipes_details = await recipe_utils.getRecipesPreview(favorite_recipes_ids)
      .catch((error) =>{ throw error;});
      res.status(200).send({recipes: favorite_recipes_details});
    }
  } catch(error){
    next(error); 
  }
});

// If user make a request about :recipeId/information, assumed the user clicked on the recipe
// and register recipeId as watched. by adding to the data base table.
router.get("/recipes/:recipeId/Information", async (req, res, next) => {
  try
  {
    const username = req.session.username;
    const recipe_id = req.params.recipeId;

    if(!req.params){
      throw {status: 400, message: "Missing, No params passed with request"};
    }
    if(!recipe_id || recipe_id === ""){
      throw {status: 400, message: "Missing, RecipeId param is empty"};
    }
    if(recipe_id.match(/^[0-9]+$/) == null){
      throw {status: 400, message: "Invalid, Recipe id most be a number"};
    }

    
    await user_utils.markAsWatchedRecipes(username, recipe_id);
    console.log("Recipe succesfully added to WatchedRecieps database " + recipe_id + "  " + username);
    next();
  }
  catch(error) {
    next(error);
  }
})


// If user make a request about search, 
// and register search parameters, by adding to the data base table.
router.get("/recipes/search", async (req, res, next) => {
  try {
    const username = req.session.username;
    const search_params = {
      query: req.query.query,
      number: req.query.number,
      cuisine: req.query.cuisine,
      diet: req.body.diet,
      intolerances: req.query.intolerances
    }

    if(Object.values(search_params).every(param => param === undefined)){
      throw {status: 204, message: 'No Content, search parameters are empty'};
    }

    await user_utils.saveSearchRequest(username, search_params);
    next();
  } catch (error) {
      next(error);
  }
});

router.get("/recent-recipes", async (req, res, next) => {
  try{
    const username = req.session.username;
    let watched_recipes_ids = [];
    const watched_recipes = await user_utils.getWatchedRecipes(username);
    watched_recipes.map((recipe) => watched_recipes_ids.push(recipe.recipe_id)); //extracting the recipe ids into array
    if(watched_recipes_ids.length == 0) {
      res.status(204).send("Yet to add Favorites recipes");
    } else {
      const watched_recipes_details = await recipe_utils.getRecipesPreview(watched_recipes_ids)
      .catch((error) =>{ throw error;});
      res.status(200).send({recipes: watched_recipes_details.slice(0, 3)});
    }
  } catch(error) {
    next(error);
  }
})

router.get("/created-recipes", async (req, res, next) => {
  try {
    const username = req.session.username;
    const created_recipes = await user_utils.getCreatedRecipes(username);
    let created_recipes_modified = [];
    created_recipes.map(recipe => {
        let {
          recipe_id,
          title,
          summary,
          readyInMinutes,
          img,
          popularity,
          vegan,
          vegetarian,
          glutenFree,
          extendedIngredients,
          instructions
      } = recipe;

      recipe_modified = {
        id: recipe_id,
        title: title,
        summary: summary,
        readyInMinutes: readyInMinutes,
        image: img,
        popularity: popularity,
        vegan: vegan ? true : false,
        vegetarian: vegetarian ? true : false,
        glutenFree: glutenFree ? true : false,
        extendedIngredients: JSON.parse(extendedIngredients),
        instructions: JSON.parse(instructions),
        custom: true
      }
      created_recipes_modified.push(recipe_modified);
    })
    res.send({recipes: created_recipes_modified});
  }catch(error) {
    next(error);
  }

});

// user allowed to create new recipes, assumed title, readInMinutes, image are required fields,
// May changed in the next work, editing the required fields, and error checking.
router.post("/create", async (req, res, next) => {
  try{
    const username = req.session.username;
    let {
      Preview,
      extendedIngredients,
      instructions,
      userData,
    } = req.body;

    let 
    {
      title,
      readyInMinutes,
      image,
      popularity,
      vegan,
      vegetarian,
      glutenFree,
      summary
    } = Preview;

    let _recipe = {
      instructions,
      // _instructions,
      extendedIngredients,
      popularity,
      readyInMinutes,
      image,
      title,
      vegan,
      vegetarian,
      glutenFree,
      summary,
      userData
    };
    
      if([title, readyInMinutes, image]
        .some((element, index, array) => {
          return element === undefined;
      })){
        throw {status: 400, message: 'Missing, most provide title, readyInMinutes, image'};
      }

      const recipe_params = {
      title: title,
      readyInMinutes: readyInMinutes,
      image: image,
      vegan: vegan,
      vegetarian: vegetarian,
      glutenFree: glutenFree,
      extendedIngredients: extendedIngredients,
      instructions: instructions,
      summary: summary
    }

    const recipe_id = await user_utils.createRecipe(username, recipe_params);
    res.status(200).send(recipe_id);
  }catch(error ) {
    next(error);
  }
});


router.use("/recipes", recipes);

module.exports = router;

// pass boo
