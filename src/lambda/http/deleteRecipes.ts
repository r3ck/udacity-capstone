import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { deleteRecipe } from '../../businessLogic/recipes'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const recipeId = event.pathParameters.recipeId
    const type = event.pathParameters.type
    const deleteRecipeResponse = await deleteRecipe(recipeId, type);
    return {
      statusCode: 200,
      body: JSON.stringify({
        item: deleteRecipeResponse
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
