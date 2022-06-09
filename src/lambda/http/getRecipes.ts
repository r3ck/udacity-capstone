import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getRecipe } from '../../businessLogic/recipes'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const recipeId = event.pathParameters.recipeId
    const getRecipeResponse = await getRecipe(recipeId);
    return {
      statusCode: 200,
      body: JSON.stringify({
        item: getRecipeResponse
      })
    }
  })

handler.use(
  cors({
    credentials: true
  })
)
