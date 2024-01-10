"use client";
import { Button } from "@/components/ui/button";
import { isRecipeLiked } from "@/server/_actions/recipes/is-liked";
import { likeRecipe } from "@/server/_actions/recipes/like-user-recipe";
import { Heart } from "lucide-react";
import React, { useState } from "react";

export const LikeButton = ({
  recipeId,
  isLikedByUser,
  totalLikes,
}: {
  recipeId: string;
  isLikedByUser: boolean | undefined;
  totalLikes: number;
}) => {
  const [likes, setlikes] = useState(totalLikes);
  const [isLiked, setIsLiked] = useState(isLikedByUser);

  //Todo - add optimistic ui update

  return (
    <div className="flex flex-col items-center">
      <form action={likeRecipe} className=" h-6">
        <input type="hidden" name="recipeId" value={recipeId} />
        <Button
          onClick={() => {
            if (isLiked) {
              setlikes(likes - 1);
              setIsLiked(false);
            } else {
              setlikes(likes + 1);
              setIsLiked(true);
            }
          }}
          className=" bg-transparent hover:bg-transparent p-0 h-auto w-auto shadow-none"
        >
          <Heart
            size={23}
            className={
              isLiked
                ? " text-destructive fill-destructive animate-pulse-slow "
                : " text-primary"
            }
          />
        </Button>
      </form>
      <span className=" text-sm">{likes}</span>
    </div>
  );
};
