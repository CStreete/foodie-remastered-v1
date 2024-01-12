"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Archive, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ProfileRecipes from "./profile-recipes";
import { UserWithRecipes } from "@/db/schema/schema";
interface ProfileContentProps {
  user: UserWithRecipes;
}
const ProfileContent = ({ user }: ProfileContentProps) => {
  const [view, setView] = useState<string>("recipe");

  return (
    <div className="  flex flex-col">
      <div className="  flex items-center justify-center space-x-10">
        <Button
          onClick={() => setView("recipe")}
          className={cn(
            " flex items-center text-center h-12 hover:bg-transparent shadow-none bg-transparent rounded-none font-bold text-secondary-foreground",
            view === "recipe"
              ? "border-t-2 border-primary animate-pulse-slow"
              : ""
          )}
        >
          <Grid3X3 size={14} className="mr-2" />
          RECEPT
        </Button>
        <Button
          onClick={() => setView("saved")}
          className={cn(
            " flex items-center text-center h-12 hover:bg-transparent shadow-none bg-transparent rounded-none font-bold text-secondary-foreground",
            view === "saved"
              ? "border-t-2 border-primary animate-pulse-slow"
              : ""
          )}
        >
          <Archive size={14} className="mr-2" />
          SPARAT
        </Button>
      </div>
      {view === "recipe" ? (
        <div className="grid lg:grid-cols-4 grid-cols-3 grid-rows-4 gap-2 w-full pt-5 ">
          {user.recipes.map((item) => {
            return (
              <div
                key={item.title}
                className=" relative flex flex-col items-center justify-center h-32 w-32 cursor-pointer"
              >
                <Image
                  src={item.image as string}
                  alt={item.title}
                  width={100}
                  height={100}
                  className=" w-full h-full rounded-md"
                />
                <span className=" absolute bg-secondary text-sm px-3 truncate rounded-md ">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ProfileContent;
