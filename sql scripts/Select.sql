-- Active: 1685369470042@@127.0.0.1@3306@recipesdb
SELECT * FROM users;

SELECT * FROM FavoriteRecipes;

SELECT * FROM SearchHistory;

SELECT * FROM WatchedRecipes;

SELECT * FROM searchhistory WHERE username='admin2';
SELECT * FROM favoriterecipes;

SELECT * FROM recipes;
-- Active: 1685369470042@@127.0.0.1@3306@recipesdb
CREATE TABLE users (
    username VARCHAR(8) NOT NULL,
    firstname VARCHAR(128) NOT NULL, 
    lastname VARCHAR(128) NOT NULL,
    country VARCHAR(128) NOT NULL,
    pwd VARCHAR(255) NOT NULL ,
    email VARCHAR(255) NOT NULL,
    profilePic VARCHAR(255) NOT NULL,

    PRIMARY KEY(username)

);

CREATE TABLE recipes (
    username VARCHAR(8) NOT NULL,
    recipe_id INT NOT NULL ,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    readyInMinutes DECIMAL NOT NULL,
    img VARCHAR(255),
    popularity DECIMAL NULL DEFAULT 100,
    vegan BOOLEAN  DEFAULT 0,
    vegetarian BOOLEAN DEFAULT 0,
    glutenFree BOOLEAN  DEFAULT 0,
    extendedIngredients TEXT,
    instructions TEXT,

    Foreign Key (username) REFERENCES users(username),
    PRIMARY KEY(username, recipe_id)
);
/* 2023-05-30 01:19:08 [64 ms] */ 
CREATE TABLE session (
    username VARCHAR(8) NOT NULL,
    session_cookie TEXT,
    session_time TIMESTAMP,

    Foreign Key (username) REFERENCES users(username),
    PRIMARY KEY (username)
);
/* 2023-05-30 01:19:49 [59 ms] */ 
CREATE TABLE FavoriteRecipes (
    username  VARCHAR(8) NOT NULL,
    recipe_id INT NOT NULL,
    Foreign Key (username) REFERENCES users(username),
    PRIMARY KEY (username, recipe_id)
);
/* 2023-05-30 01:20:07 [55 ms] */ 


create TABLE WatchedRecipes (
    username VARCHAR(8) NOT NULL,
    recipe_id INTEGER NOT NULL,
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    Foreign Key (username) REFERENCES users(username),
    PRIMARY KEY (username, recipe_id)
);

create TABLE SearchHistory (
    username VARCHAR(8) NOT NULL,
    search_params VARCHAR(255),
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    Foreign Key (username) REFERENCES users(username),
    PRIMARY KEY (username)
);


DROP TABLE favoriterecipes;
DROP TABLE WatchedRecipes;
DROP TABLE SearchHistory;
DROP TABLE session;
DROP TABLE recipes;
DROP TABLE users;