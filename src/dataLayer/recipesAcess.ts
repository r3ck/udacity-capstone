import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
// import { createLogger } from '../utils/logger'
import { RecipeItem } from '../models/RecipeItem'
import { RecipeUpdate } from '../models/RecipeUpdate';

const XAWS = AWSXRay.captureAWS(AWS)

export class RecipesAccess {

  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly recipesTable = process.env.RECIPES_TABLE
  ) {
  }

  async getRecipesForUser(): Promise<RecipeItem[]> {
    const params = {
      TableName: this.recipesTable
    };
    const result = await this.docClient.query(params).promise();
    return result.Items as RecipeItem[]
  }

  async getRecipe(recipeId: string, type: string): Promise<RecipeItem> {
    const params = {
      TableName: this.recipesTable,
      Key: { recipeId, type }
    };
    const result = await this.docClient.get(params).promise()
    return result.Item as RecipeItem
  }

  async createRecipe(recipeItem: RecipeItem): Promise<RecipeItem> {
    const params = {
      TableName: this.recipesTable,
      Item: recipeItem,
    }
    await this.docClient.put(params).promise()
    return Promise.resolve(recipeItem)
  }

  async updateRecipe(recipeId: string, type: string, recipeUpdate: RecipeUpdate) {
    const params = {
      TableName: this.recipesTable,
      Key:{ recipeId, type },
      UpdateExpression: 'set #name = :name, ingredients = :ingredients, preparationMode = :preparationMode',
      ExpressionAttributeNames: {
        "#name": "name"
      },
      ExpressionAttributeValues: {
        ":name": recipeUpdate.name,
        ":ingredients": recipeUpdate.ingredients,
        ":preparationMode": recipeUpdate.preparationMode
      }
    }
    await this.docClient.update(params).promise()

  }

  async deleteRecipe(recipeId: string, type: string): Promise<void> {
    const params = {
      TableName: this.recipesTable,
      Key:{ recipeId, type }
    };
    await this.docClient.delete(params).promise();
    return Promise.resolve()
  }
}