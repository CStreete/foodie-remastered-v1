import { auth } from "@/auth";
import { db } from "@/db";
import { newChat } from "@/server/_actions/chat/create-chat";
import { userMessages } from "@/server/_actions/chat/get-user-messages";
import { getComments } from "@/server/_actions/recipes/get-comments";
import { userFollowers } from "@/server/_actions/users/get-user-followers";
import React from "react";

const Protected = async () => {
  const user = await auth();
  const { data } = await userMessages();

  //const { followers, following } = await userFollowers();
  return (
    <main>
      <div>
        {data?.map((time) => {
          return (
            <div>
              <p>{time.timestamp.toString()}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Protected;
