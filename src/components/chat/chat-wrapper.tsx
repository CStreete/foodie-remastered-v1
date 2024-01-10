"use client";
import React, { Fragment } from "react";
import { ChatContextProvider } from "./chat-context";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { FoodieLogo } from "../foodie-icon";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";
import { TMessage } from "@/db/schema/schema";
interface ChatWrapperProps {
  image: string;
  initialMessages?: TMessage[];
}
const ChatWrapper = ({ image }: ChatWrapperProps) => {
  return (
    <ChatContextProvider>
      <Fragment>
        <ScrollArea className="flex-1 p-4 space-y-4 h-full xl:pl-72    ">
          <ChatMessages />
        </ScrollArea>
        <ChatInput />
      </Fragment>
    </ChatContextProvider>
  );
};

export default ChatWrapper;

/*
<div className="flex items-center space-x-2 ">
            <div className="flex-none">
              <Avatar className="w-8 h-8">
                <FoodieLogo
                  priority
                  src={"/Foodie-Logo.svg"}
                  alt="Foodie Logo"
                  loading="eager"
                  quality={100}
                  height={100}
                  width={100}
                />
                <AvatarFallback>CG</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <div className="p-3 rounded-lg lg:max-w-[500px] bg-darkPink ">
                Hejsan! Jag är Foodie, din personliga AI som hjälper dig med din
                mat. Ladda upp en bild på din mat eller ställ frågor till mig
                kopplat till matlagning så ska jag försöka hjälpa dig.
              </div>
            </div>
          </div>

*/
