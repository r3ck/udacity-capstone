import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateRecipeRequest } from '../../requests/CreateRecipeRequest'
import { createRecipe } from '../../businessLogic/recipes'


export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newRecipe: CreateRecipeRequest = JSON.parse(event.body)
    const createRecipeResponse = await createRecipe(newRecipe);
    return {
      statusCode: 200,
      body: JSON.stringify({
        item: createRecipeResponse
      })
    }
  })

handler.use(
  cors({
    credentials: true
  })
)
