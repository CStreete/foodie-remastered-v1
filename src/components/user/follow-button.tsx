"use client";

import { Heart } from "lucide-react";
import React, { use, useEffect, useOptimistic, useState } from "react";
import { Button } from "../ui/button";
import { userFollow } from "@/server/_actions/users/user-follow";
import { User } from "@auth/core/types";
import { TUser, follow } from "@/db/schema/schema";
import { is } from "drizzle-orm";
interface FollowbuttonProps {
  user: TUser;
  isFollowing: boolean | undefined;
}

const Followbutton = ({ user, isFollowing }: FollowbuttonProps) => {
  //Todo - add optimistic ui update for follow number

  return (
    <form
      action={async () => userFollow(user.id, isFollowing)}
      className=" h-6"
    >
      <input type="hidden" name="follow_user_id" value={user?.id} />
      <Button
        onClick={() => null}
        className=" font-bold h-7 ml-5   bg-darkPink  hover:bg-buttonPink"
      >
        {isFollowing ? "Sluta Följa" : "Följa"}
      </Button>
    </form>
  );
};

export default Followbutton;
