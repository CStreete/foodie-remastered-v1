import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { reccomendedUsers } from "@/server/_actions/recipes/reccomended-users";

import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

const RecommendedUser = async () => {
  const users = await reccomendedUsers();

  return (
    <div className=" flex flex-col pt-5">
      {users?.map((user) => {
        return (
          <div key={user.id}>
            <Link href={`/${user.id}`} key={user.id}>
              <div className=" flex space-x-2 pb-4">
                <Avatar className=" h-12 w-12">
                  <AvatarImage src={user.image as string} />
                  <AvatarFallback>
                    <CircleUserRound />
                  </AvatarFallback>
                </Avatar>
                <div className=" flex flex-col">
                  <span className=" pt-1">{user.name}</span>
                  <span className=" text-muted-foreground text-sm">
                    Rekommenderad
                  </span>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default RecommendedUser;
