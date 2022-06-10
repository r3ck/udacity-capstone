import { RecipesAccess } from '../dataLayer/recipesAcess'
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
        type: createRecipeRequest.type,
        createdAt: new Date().toISOString()
    }
    return await recipesAccess.createRecipe(params)
}

export const getRecipe = async (recipeId: string, type: string): Promise<RecipeItem> => {
    return await recipesAccess.getRecipe(recipeId, type);
}

export const getRecipesForUser = async (): Promise<RecipeItem[]> => {
    return await recipesAccess.getRecipesForUser();
}

export async function updateRecipe(
    recipeId: string, 
    type: string,
    updateRecipeRequest: UpdateRecipeRequest) {
    return await recipesAccess.updateRecipe(recipeId, type, updateRecipeRequest);
}

export async function deleteRecipe(recipeId: string, type: string) {
    return await recipesAccess.deleteRecipe(recipeId, type);
}
