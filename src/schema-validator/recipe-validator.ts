import z from "zod";

export const RecipeValidator = z.object({
  title: z.string().min(5).max(50),
  description: z.string().min(1).max(255),
  ingredients: z
    .object({
      ingredient: z.string().min(1).max(50),
    })
    .array(),
  instructions: z
    .object({
      step: z.string().min(1).max(50),
    })
    .array(),
  image: z.custom<File>(),
});

export type TRecipeValidator = z.infer<typeof RecipeValidator>;
