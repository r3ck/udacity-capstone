import { RecipesAccess } from './recipesAcess'
import { RecipeItem } from '../models/RecipeItem'
import { CreateRecipeRequest } from '../requests/CreateRecipeRequest'
import { UpdateRecipeRequest } from '../requests/UpdateRecipeRequest'
// import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'


const recipesAccess = new RecipesAccess()

export async function createRecipe(createRecipeRequest: CreateRecipeRequest): Promise<RecipeItem> {
    const recipeId = uuid.v4()
    const params = {
        recipeId: recipeId,
        name: createRecipeRequest.name,
        ingredients: createRecipeRequest.ingredients,
        preparationMode: createRecipeRequest.preparationMode,
        createdAt: new Date().toISOString()
    }
    return await recipesAccess.createRecipe(params)
}

export const getRecipe = async (recipeId: string): Promise<RecipeItem> => {
    return await recipesAccess.getRecipe(recipeId);
}

export const getRecipesForUser = async (): Promise<RecipeItem[]> => {
    return await recipesAccess.getRecipesForUser();
}

export async function updateRecipe(
    recipeId: string, 
    updateRecipeRequest: UpdateRecipeRequest) {
    return await recipesAccess.updateRecipe(recipeId, updateRecipeRequest);
}

export async function deleteRecipe(recipeId: string) {
    return await recipesAccess.deleteRecipe(recipeId);
}
