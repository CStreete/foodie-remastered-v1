import Image from "next/image";
import React, { Fragment, use, useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FoodieLogo } from "../foodie-icon";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatContext } from "./chat-context";
import { useSession } from "next-auth/react";
import { TMessage, chatMessage } from "@/db/schema/schema";
import { userMessages } from "@/server/_actions/chat/get-user-messages";
import { Separator } from "../ui/separator";

const ChatMessages = () => {
  const { message, openAiResponse } = useContext(ChatContext);
  const [chatMessages, setChatMessages] = useState<TMessage[]>([]); // TODO: Fix this
  const session = useSession(); // TODO: Fix this

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await userMessages();
      if (!data) {
        return;
      }
      setChatMessages(data);
    };
    fetchMessages();
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col items-start   space-y-4">
        {chatMessages.map((message, index) =>
          message.isUserMessage ? (
            <div className=" flex flex-col w-full ">
              <div className="flex-1 text-left">
                <div className="p-3 rounded-lg flex justify-start ">
                  {/** <Image src={""} alt="User Image" height={300} width={300} /> */}
                </div>
                <div className="flex items-center">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      alt="User"
                      src={session.data?.user.image as string}
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>{" "}
                  <p className="p-3 rounded-lg text-muted-foreground">
                    {" "}
                    {message.content}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1"></p>
              </div>
              {index < chatMessages.length - 1 && (
                <Separator className="lg:w-3/5 mt-10" />
              )}
            </div>
          ) : (
            <div className=" flex flex-col w-full ">
              <div className="flex-1 text-left">
                <div className="p-3 rounded-lg flex justify-start ">
                  {/** <Image src={""} alt="User Image" height={300} width={300} /> */}
                </div>
                <div className="flex items-start">
                  <Avatar className="w-8 h-8">
                    <FoodieLogo
                      priority
                      src={"/Foodie-Logo.svg"}
                      alt="Foodie Logo"
                      loading="eager"
                      quality={100}
                      height={50}
                      width={50}
                    />
                    <AvatarFallback>CG</AvatarFallback>
                  </Avatar>
                  <p className="p-3 rounded-lg text-muted-foreground max-w-[700px]">
                    {" "}
                    {openAiResponse}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1"></p>
              </div>
              {index < chatMessages.length - 1 && (
                <Separator className="lg:w-3/5 mt-10" />
              )}
            </div>
          )
        )}
      </div>
    </Fragment>
  );
};

export default ChatMessages;
