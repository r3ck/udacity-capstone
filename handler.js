const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");

const app = express();

const RECIPES_TABLE = process.env.RECIPES_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get("/recipes", async function (req, res) {
  const params = {
    TableName: RECIPES_TABLE
  };

  try {

    const recipes = [];
    let items;
    do{
        items =  await dynamoDbClient.scan(params).promise();
        items.Items.forEach((item) => recipes.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey !== "undefined");
    
    res.status(200).json({ recipes });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive recipes" });
  }
});


app.get("/recipes/:recipeId", async function (req, res) {
  const params = {
    TableName: RECIPES_TABLE,
    Key: {
      recipeId: req.params.recipeId,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const { recipeId, name, ingredients, recipe } = Item;
      res.json({ recipeId, name, ingredients, recipe });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find recipe with provided "recipeId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive recipe" });
  }
});

app.post("/recipes", async function (req, res) {
  const { recipeId, name, ingredients, recipe } = req.body;
  if (typeof recipeId !== "string") {
    res.status(400).json({ error: '"recipeId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  } else if (typeof ingredients !== "string") {
    res.status(400).json({ error: '"ingredients" must be a string' });
  } else if (typeof recipe !== "string") {
    res.status(400).json({ error: '"recipe" must be a string' });
  }

  const params = {
    TableName: RECIPES_TABLE,
    Item: {
      recipeId: recipeId,
      name: name,
      ingredients: ingredients,
      recipe: recipe,
      timestamp: new Date().getTime()
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json({ recipeId, name, ingredients, recipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create recipe" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
