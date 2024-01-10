import Image from "next/image";
import React, {
  Fragment,
  use,
  useContext,
  useEffect,
  useOptimistic,
  useState,
} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FoodieLogo } from "../foodie-icon";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatContext } from "./chat-context";
import { useSession } from "next-auth/react";
import { TMessage } from "@/db/schema/schema";
import { userMessages } from "@/server/_actions/chat/get-user-messages";
import { Separator } from "../ui/separator";
import { ne } from "drizzle-orm";
import { tree } from "next/dist/build/templates/app-page";
import { cn } from "@/lib/utils";
import { User, User2Icon } from "lucide-react";

const ChatMessages = () => {
  const { messages } = useContext(ChatContext);

  // TODO: Fix this

  const session = useSession(); // TODO: Fix this

  return (
    <Fragment>
      <div className="flex flex-col items-start ml-5 overflow-y-auto  ">
        <div className=" flex-1 flex-grow space-y-10">
          {messages.map((m, indx) => {
            return (
              <div
                key={m.id}
                className={cn("flex items-end", {
                  "justify-start": m.isUserMessage,
                })}
              >
                <div
                  className={cn(
                    "relative flex h-6 w-6 aspect-square items-center justify-center order-1 rounded-sm",
                    {
                      " bg-zinc-800 rounded-sm": !m.isUserMessage,
                    }
                  )}
                >
                  {m.isUserMessage ? (
                    <Avatar className=" h-6 w-6">
                      <User2Icon />
                      <AvatarFallback>
                        <User2Icon />
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <FoodieLogo
                      priority
                      src={"/Foodie-Logo.svg"}
                      alt="Foodie Logo"
                      loading="eager"
                      quality={100}
                      height={50}
                      width={50}
                    />
                  )}
                </div>

                <div
                  className={cn(
                    "flex flex-col space-y-2 text-base max-w-md mx-2",
                    {
                      "order-1 items-end": m.isUserMessage,
                      "order-2 items-start": !m.isUserMessage,
                    }
                  )}
                >
                  <div
                    className={cn("px-4 py-2 rounded-lg rounded-bl-none", {
                      "bg-secondary ": !m.isUserMessage,
                    })}
                  >
                    {m.isUserMessage ? (
                      <div className="  w-full flex items-start">
                        {m.imageUrl !== "" ? (
                          <Image
                            src={m.imageUrl as string}
                            alt="User Image"
                            height={300}
                            width={300}
                            className="w-full rounded-lg"
                          />
                        ) : null}
                      </div>
                    ) : null}
                    {typeof m.content === "string" ? (
                      <Markdown
                        className={cn("prose", {
                          "text-zinc-50 ": m.isUserMessage,
                        })}
                      >
                        {m.content}
                      </Markdown>
                    ) : (
                      m.content
                    )}
                    {m.id !== "loading-message" ? (
                      <div
                        className={cn(
                          "text-xs select-none mt-2 w-full text-left"
                        )}
                      >
                        {m.timestamp.toLocaleString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default ChatMessages;

/* {initialMessages.map((message, index) =>
          message ? (
            <div className=" flex flex-col w-full  ">
              <div className="flex-1 text-left">
                <div className="p-3 rounded-lg flex justify-start ">
                  {/** <Image src={""} alt="User Image" height={300} width={300} /> *
                  </div>
                  <div className="flex items-start ">
                    {message.isUserMessage ? (
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          alt="User"
                          src={session.data?.user.image as string}
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    ) : (
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
                    )}
  
                    <div className=" flex flex-col ml-2">
                      {isLoading ? <div>loading.....</div> : null}
                      <p className="p-3 rounded-lg text-muted-foreground">
                        {message.content}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1"></p>
                </div>
                {index < initialMessages.length - 1 && (
                  <Separator className="lg:w-3/5 mt-10" />
                )}
              </div>
            ) : null
          )}
          <div className=" flex flex-col w-full ">
            <div className="flex-1 text-left">
              <div className="p-3 rounded-lg flex justify-start ">
                {/** <Image src={""} alt="User Image" height={300} width={300} /> *
              </div>
              <div className="flex items-start">
                <p className="p-3 rounded-lg text-muted-foreground max-w-[700px]">
                  {openAiResponse}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1"></p>
            </div>
  
            <Separator className="lg:w-3/5 mt-10" />
          </div>*/
