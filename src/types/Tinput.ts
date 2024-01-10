export type TRecipeState = {
  default: boolean
  title: boolean
  description: boolean
  ingredients: boolean
  instructions: boolean
  complete: boolean
}

export type TRecipe = {
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
}
