import { TRecipeState } from "@/types/Tinput";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
export const useRecipeNavigation = () => {
  const [createRecipe, setCreateRecipe] =
    useState<keyof TRecipeState>("default");

  const clearNavigationStates = () => {
    setCreateRecipe("default");
  };

  const handleNext = () => {
    switch (createRecipe) {
      case "default":
        setCreateRecipe("title");
        break;
      case "title":
        setCreateRecipe("description");
        break;
      case "description":
        setCreateRecipe("ingredients");
        break;
      case "ingredients":
        setCreateRecipe("instructions");
        break;
      case "instructions":
        setCreateRecipe("complete");
        break;
      default:
        setCreateRecipe("default");
        break;
    }
  };

  const handleBack = () => {
    switch (createRecipe) {
      case "title":
        setCreateRecipe("default");
        break;
      case "description":
        setCreateRecipe("title");
        break;
      case "ingredients":
        setCreateRecipe("description");
        break;
      case "instructions":
        setCreateRecipe("ingredients");
        break;
      case "complete":
        setCreateRecipe("instructions");
        break;
      default:
        setCreateRecipe("default");
        break;
    }
  };

  return {
    createRecipe,
    handleNext,
    handleBack,
    clearNavigationStates,
  };
};
