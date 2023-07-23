const DButils = require("./DButils");

// Mark recipes, adding to FavoriteRecipes table, username, recipe_id are primary keys.
// therefore, only unique (username, recipe_id) pairs
async function markAsFavorite(username, recipe_id){
    await DButils.execQuery(`INSERT INTO FavoriteRecipes(username, recipe_id) values (?, ?)
    ON DUPLICATE KEY UPDATE recipe_id=?`, 
    [
        username, 
        recipe_id, 
        recipe_id
    ]);
}

// Get favorites recipes, contains given username
async function getFavoriteRecipes(username){
    const recipes_id = await DButils.execQuery(`select recipe_id from FavoriteRecipes where username=?`, username);
    return recipes_id;
}

// Mark recipes, adding to WatchedRecipes table, username, recipe_id are primary keys.
async function markAsWatchedRecipes(username, recipe_id){
    await DButils.execQuery(`insert into WatchedRecipes (username, recipe_id) values (?, ?)
    ON DUPLICATE KEY UPDATE recipe_id=?`, [
        username, 
        recipe_id, 
        recipe_id
    ]);
}

// Get Watched recipes, contains given username
// therefore, only unique (username, recipe_id) pairs
async function getWatchedRecipes(username, amount){
    const recipes_ids = await DButils.execQuery(`SELECT recipe_id from WatchedRecipes
    WHERE username=? ORDER BY ts desc`, [username]); // LIMIT ${amount}
    return recipes_ids;
}

// Save the search request parameters, username is primary
// Therefore, user can have only one stored search history at a time.
async function saveSearchRequest(username, search_params){
    await DButils.execQuery(`INSERT INTO SearchHistory ( username, search_params)
        VALUES(?, ?)
        ON DUPLICATE KEY UPDATE search_params = ?`,
        [username, JSON.stringify(search_params), JSON.stringify(search_params)]);

    // Cheat - database for unknown reason update only on second INSERT
    // await DButils.execQuery(`INSERT INTO SearchHistory ( username, search_params)
    //     VALUES('${username}', '${JSON.stringify(search_params)}')
    //     ON DUPLICATE KEY UPDATE search_params = '${JSON.stringify(search_params)}'`);
}

// get The search recipe
async function getSearchHistory(username){
    return await DButils.execQuery(`SELECT search_params FROM SearchHistory Where username=?`, username);
}

// Create recipe, and register the given field to the database
// user can get his recipes coorsponding to his recipe_id.
async function createRecipe(username, recipe_params){
    const {
    title,
    readyInMinutes,
    image,
    vegan,
    vegetarian,
    glutenFree,
    summary,
    extendedIngredients,
    instructions} = recipe_params;
    const readyInMinutes_number = parseInt(readyInMinutes.split(':')[0])*60 + parseInt(readyInMinutes.split(':')[1]);
    const vegan_smallint = vegan ? 1 : 0;
    const vegetarian_smallint = vegetarian ? 1 : 0;
    const glutenFree_smallint = glutenFree ? 1 : 0;
    const recipe_id = await DButils.execQuery(`SELECT COUNT(*) FROM recipes`)
    .then((count) => {
        return Object.values(count[0])[0];
    });

    console.log(recipe_id);
    await DButils.execQuery(`INSERT INTO 
    recipes (username, recipe_id, title, summary, readyInMinutes, img, vegan, vegetarian, glutenFree, extendedIngredients, instructions)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
        username, 
        recipe_id+1, 
        title, 
        summary, 
        readyInMinutes_number, 
        image, vegan_smallint, 
        vegetarian_smallint, 
        glutenFree_smallint, 
        JSON.stringify(extendedIngredients), 
        JSON.stringify(instructions)
    ]
    )
}

// Get all created recipes by username
async function getCreatedRecipes(username){
    return await DButils.execQuery(`SELECT * FROM Recipes WHERE username = ?`, username);
}

exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;

exports.markAsWatchedRecipes = markAsWatchedRecipes;
exports.getWatchedRecipes = getWatchedRecipes;

exports.saveSearchRequest = saveSearchRequest;
exports.getSearchHistory = getSearchHistory;

exports.createRecipe = createRecipe;
exports.getCreatedRecipes = getCreatedRecipes;