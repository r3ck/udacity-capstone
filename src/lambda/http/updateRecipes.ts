import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { updateRecipe } from '../../businessLogic/recipes'
import { UpdateRecipeRequest } from '../../requests/UpdateRecipeRequest'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const recipeId = event.pathParameters.recipeId
    const type = event.pathParameters.type
    const updatedRecipe: UpdateRecipeRequest = JSON.parse(event.body)
    const updateRecipeResponse = await updateRecipe(recipeId, type, updatedRecipe);
    return {
      statusCode: 200,
      body: JSON.stringify({
        item: updateRecipeResponse
      })
    }
  })

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
