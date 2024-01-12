import { TUser, UserWithRecipes, follow } from "@/db/schema/schema";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import FollowButton from "./follow-button";
import { userFollowers } from "@/server/_actions/users/get-user-followers";
import { currentUser } from "@/lib/currentUser";
import ProfileContent from "./profile-content";

interface ProfileHeaderProps {
  isUserProfile: boolean;
  user: UserWithRecipes;
}

export const ProfileHeader = async ({
  user,
  isUserProfile,
}: ProfileHeaderProps) => {
  const currentLoggedInUser = await currentUser();

  const { followers, following } = await userFollowers(user.id);

  const isFollowing = followers?.some(
    (follow) => follow.userId === currentLoggedInUser?.id
  );

  return (
    <div className=" flex flex-col min-w-0 lg:w-[600px]">
      <div className=" bg-primary-foreground w-full lg:h-60 h-52 flex items-start  rounded-lg p-3 ">
        <div className=" flex">
          <Avatar className=" xl:w-[120px] xl:h-[120px] w-[70px] h-[70px]">
            <AvatarImage alt="Avatar" src={user.image as string} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className=" lg:pl-20 pl-10 flex flex-col ">
            <div className=" flex items-center">
              <p className="truncate font-bold">{user.name}</p>

              {isUserProfile ? (
                <div className=" flex items-center">
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className=" font-bold h-7 ml-5 "
                  >
                    Redigera profil
                  </Button>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className=" font-bold h-7 ml-2"
                  >
                    <Settings />
                  </Button>
                </div>
              ) : (
                <div className=" flex space-x-2 pl-3">
                  <FollowButton isFollowing={isFollowing} user={user} />
                  <Button
                    variant={"outline"}
                    size={"lg"}
                    className=" font-bold h-7 "
                  >
                    Meddelande
                  </Button>
                </div>
              )}
            </div>

            <div className=" flex space-x-8 pt-10">
              <div className=" flex flex-col items-center">
                <span>0</span>
                <span>Recept</span>
              </div>
              <div className=" flex flex-col items-center">
                <span>{followers?.length}</span>
                <span>Följare</span>
              </div>
              <div className=" flex flex-col items-center">
                <span>{following?.length}</span>
                <span>Följer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileContent user={user} />
    </div>
  );
};
