# Simple Recipes API

This is a simple API for creating and displaying recipes. I used this code (https://github.com/serverless/examples/tree/v3/aws-node-express-dynamodb-api) as base. 


## Building blocks

**handler.js:** Has the code for the three endpoints: 
  - `POST /recipes`: Creates new recipe;
  - `GET /recipes/recipeId`: Gets a recipe given an `recipeId`;
  - `GET /recipes`: List all avaiable recipes;


**serverless.yml:** Has the code for the serverless deployment. 
  - `recipeId`: is the *partitionKey*;
  - `timestamp`: is the *sortKey*


## Usage

### Deployment

Install dependencies with:

```
npm install
```

and then deploy with:

```
serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying node-express-dynamodb-recipes-api to stage dev (us-east-1)

✔ Service deployed to stack node-express-dynamodb-recipes-api-dev (64s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: node-express-dynamodb-recipes-api-dev-api (973 kB)
```

### Invocation

After successful deployment, you can create a new user by calling the corresponding endpoint:

1. Create a new recipe - `POST /recipes`

- Request
```
curl --location --request POST 'https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/recipes' \
--header 'Content-Type: application/json' \
--data-raw '{
    "recipeId": "1",
    "name": "Hamburger",
    "ingredients":"Pão, carne, queijo, Farinha",
    "recipe":"Misture"
}'
```
- Response
```
{
    "recipeId": "1",
    "name": "Hamburger",
    "ingredients": "Pão, carne, queijo, Farinha",
    "recipe": "Misture"
}
```

2. Get a recipe by id - `GET /recipes/recipeId`

- Request
```
curl --location --request GET 'https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/recipes/1'
```
- Response
```
{
    "recipeId": "1",
    "name": "Hamburger",
    "ingredients": "Pão, carne, queijo, Farinha",
    "recipe": "Misture"
}
```
3. List all recipes - `GET /recipes`

- Request
```
curl --location --request GET 'https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/recipes'
```
- Response
```
{
    "recipes": [
        {
            "recipeId": "2",
            "recipe": "Misture",
            "ingredients": "Agua, Farinha",
            "name": "Pizza"
        },
        {
            "recipeId": "1",
            "recipe": "Misture",
            "ingredients": "Pão, carne, queijo, Farinha",
            "name": "Hamburger"
        }
    ]
}
```


