import { auth } from "@/auth";
import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { MessageCircleIcon, Redo, SendIcon } from "lucide-react";
import { LikeButton } from "./like-button";
import Comments from "./comments";
import { forYouRecipes } from "@/server/_actions/recipes/fetch-all-recipes";

export const ForYouRecipes = async () => {
  const user = await auth();

  if (!user) {
    return;
  }

  const { data: recipes, error: recipesError } = await forYouRecipes();

  const isLiked = recipes?.map((recipe) =>
    recipe.likes.some((ruser) => ruser.userId === user?.user.id)
  );

  if (recipesError) {
    return; //Todo - add better error handling
  }

  if (!recipes) {
    return <div>Det finns inga recept för dig just nu</div>;
  }

  return (
    <div className=" flex flex-col items-center space-y-40 ">
      {recipes?.map((recipe, index) => {
        const recipeIsLiked = isLiked && isLiked[index];
        return (
          <div key={recipe.id} className=" lg:w-[400px]  h-[500px] pt-20">
            <h1 className=" text-lg font-bold pb-2">{recipe.title}</h1>
            <Image
              src={recipe.image as string}
              alt="recipe"
              width={400}
              height={500}
              className=" object-cover w-full h-full"
            />
            <div className=" flex items-center pt-3 space-x-3">
              <div className="flex flex-col items-center h-12 ">
                <Avatar className=" w-[28px] h-[28px]">
                  <AvatarImage
                    alt="Avatar"
                    src={recipe.author.image as string}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <LikeButton
                totalLikes={recipe.likes.length}
                isLikedByUser={recipeIsLiked}
                recipeId={recipe.id}
              />
              <div className="flex flex-col items-center">
                <Button className=" bg-transparent hover:bg-transparent p-0 h-auto w-auto shadow-none">
                  <MessageCircleIcon size={23} className=" text-primary" />
                </Button>

                <span className=" text-sm ">{recipe.comments.length}</span>
              </div>
              <div className="flex flex-col items-center">
                <Button className=" bg-transparent hover:bg-transparent p-0 h-auto w-auto shadow-none">
                  <SendIcon size={23} className=" text-primary" />
                </Button>

                <span className=" text-sm">0</span>
              </div>
            </div>
            <div className="flex justify-between">
              <p className=" text-sm">{recipe.description}</p>
              <Button>Till Receptet</Button>
            </div>

            <div className=" border-b border-muted-foreground pb-8 ">
              <Comments
                recipeIsLiked={recipeIsLiked}
                recipe={recipe}
                children={undefined}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
