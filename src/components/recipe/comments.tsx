"use client";
import React, { ReactNode, useState } from "react";
import { CardContent, Card } from "@/components/ui/card";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, SendIcon, User2Icon } from "lucide-react";
import { RecipeWithRelations } from "@/db/schema/schema";

import { useSession } from "next-auth/react";
import { newComment } from "@/server/_actions/recipes/comment-recipie";
import { LikeButton } from "./like-button";

const Comments = ({
  recipe,
  children,
  recipeIsLiked,
}: {
  recipe: RecipeWithRelations;
  children: ReactNode;
  recipeIsLiked: boolean | undefined;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const user = useSession();

  const [comments, setComments] = useState<RecipeWithRelations["comments"]>([]);

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="p-0" variant="link">
            Visa alla {recipe.comments.length} kommentarer
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1000px] flex h-[630px]  ">
          <div className="aspect-w-21 aspect-h-9 col-span-2">
            <Image
              alt="Dialog content image"
              className="object-cover"
              height={585}
              src={recipe?.image as string}
              style={{
                aspectRatio: "455/585",
                objectFit: "cover",
              }}
              width={455}
            />
          </div>
          <div className="space-y-6 ">
            <Card className="  h-20 w-[460px] shadow-none rounded-none border-r-0 border-l-0 border-t-0 border-b border-secondary">
              <CardContent className="text-sm flex m-0 p-0">
                <div className=" mt-3 flex items-center">
                  <Avatar className=" h-8 w-8">
                    <AvatarImage
                      alt="Your avatar"
                      src={recipe?.author.image as string}
                    />
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                  <p className=" pl-3 font-semibold text-xl">
                    {recipe?.author.name}
                  </p>
                </div>
              </CardContent>
            </Card>
            {recipe?.comments.map((comment) => (
              <div key={comment.id} className=" w-[460px]">
                <div className=" flex items-center">
                  <Avatar className=" h-6 w-6">
                    <AvatarImage
                      alt="Your avatar"
                      src={comment.userImage as string}
                    />
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                  <span className=" text-sm ml-2">{comment.userName}</span>
                  <p className=" pl-2 text-xs">{comment.content}</p>
                </div>
              </div>
            ))}
            <div className="flex-col items-center gap-2 absolute bottom-7 w-[460px] ">
              <div className=" border-b border-t border-secondary pt-5 pb-2 mb-3">
                <div className=" pb-4 flex items-center space-x-3">
                  <LikeButton
                    totalLikes={recipe.likes.length}
                    isLikedByUser={recipeIsLiked}
                    recipeId={recipe.id}
                  />
                  <div className=" flex flex-col items-center">
                    <MessageCircle size={23} className="text-primary" />
                    <span className=" text-sm">{recipe.comments.length}</span>
                  </div>
                  <div className=" flex flex-col items-center">
                    <SendIcon size={23} className=" text-primary" />
                    <span className=" text-sm">0</span>
                  </div>
                </div>

                <div className=" text-sm flex flex-col">
                  <span>3 gilla markeringar</span>
                  <span>1 dag sen</span>
                </div>
              </div>
              <div className=" flex items-center">
                <Avatar className=" h-8 w-8">
                  <AvatarImage
                    alt="Your avatar"
                    src={user.data?.user.image as string}
                  />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
                <form action={newComment} className="flex flex-grow">
                  <input name="recipeId" type="hidden" value={recipe.id} />
                  <Input
                    className="flex-grow focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none border-none shadow-none"
                    id="content"
                    name="content"
                    type="text"
                    placeholder="Skriv en kommentar..."
                  />

                  <Button variant={"ghost"}>Publicera</Button>
                </form>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="p-0" variant="link">
          Visa alla {recipe?.comments.length} kommentarer
        </Button>
      </DrawerTrigger>
      <DrawerContent className=" outline-none border-none">
        <DrawerHeader>
          <DrawerTitle className=" text-base   ">Kommentarer</DrawerTitle>
        </DrawerHeader>
        <div className=" border-t border-secondary p-4 pb-10 ">
          {recipe?.comments.map((comment) => (
            <Card
              key={comment.id}
              className="  h-14   shadow-none rounded-none border-none mb-2"
            >
              <CardContent className="text-sm flex m-0 p-0">
                <div className=" mt-3 flex items-center  w-full relative">
                  <Avatar className=" h-7 w-7">
                    <AvatarImage
                      alt="Your avatar"
                      src={comment.userImage as string}
                    />
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                  <div className=" pl-3 text-sm flex flex-col justify-center ">
                    <p className=" ">{comment.userName}</p>
                    <p>{comment.content}</p>
                  </div>
                  <div className=" absolute right-0 cursor-pointer">
                    <Heart size={20} className=" text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="flex-col items-center gap-2 absolute bottom-7 w-[460px] ">
            <div className=" flex items-center">
              <Avatar className=" h-8 w-8">
                <AvatarImage
                  alt="Your avatar"
                  src={user.data?.user.image as string}
                />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <form action={newComment} className="flex flex-grow">
                <input name="recipeId" type="hidden" value={recipe.id} />
                <Input
                  className="flex-grow focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none border-none shadow-none"
                  type="text"
                  placeholder="Skriv en kommentar..."
                />

                <Button variant={"ghost"}>Publicera</Button>
              </form>
            </div>
          </div>
        </div>

        <DrawerFooter className=" ">{children}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Comments;
