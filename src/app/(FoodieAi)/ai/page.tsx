import React from "react";

import { FoodieAi } from "@/components/ai/foodie-ai";
import { currentUser } from "@/lib/currentUser";
import ChatWrapper from "@/components/chat/chat-wrapper";

const FoodieAI = async () => {
  const user = await currentUser();

  if (!user) {
    return;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen lg:px-10 lg:ml-[300px]">
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold">Min Ai</h2>
        </header>
        <ChatWrapper image={""} />
      </div>
    </div>
  );
};

export default FoodieAI;
