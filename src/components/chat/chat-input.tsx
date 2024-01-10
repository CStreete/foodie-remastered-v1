"use client";
import React, { useContext, useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ImageIcon, Send } from "lucide-react";
import { ChatContext } from "./chat-context";
import { useMutation } from "@tanstack/react-query";
import { TMessage } from "@/db/schema/schema";
import { v4 as uuidv4 } from "uuid";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Input } from "../ui/input";

interface ChatInputProps {
  isDisabled?: boolean;
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState<string>("");
  const session = useSession();

  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(ChatContext);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationKey: ["sendMessage"],

    mutationFn: async (_message: TMessage) => {
      const res = await fetch("/api/foodieai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: messages }),
      });
      return res.body;
    },
    onMutate(message) {
      addMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) return;

      const id = uuidv4();
      const responseMessage: TMessage = {
        id: id,
        isUserMessage: false,
        userId: "foodie",
        timestamp: new Date(),
        content: "",
      };

      addMessage(responseMessage);
      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunkValue);
      }

      setIsMessageUpdating(false);
      setInput("");
    },
    onError: (_, message) => {
      removeMessage(message.id);
      textAreaRef.current?.focus();
    },
  });

  const userMessage: TMessage = {
    id: uuidv4(),
    isUserMessage: true,
    userId: session.data?.user.id as string,
    timestamp: new Date(),
    content: input,
  };

  return (
    <footer className="p-4 lg:pb-10 pb-20">
      <div className="flex items-center space-x-3 lg:justify-center">
        <Textarea
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              sendMessage(userMessage);

              textAreaRef.current?.focus();
            }
          }}
          ref={textAreaRef}
          autoFocus
          placeholder="Skriv ett meddelande till Foodie..."
          onChange={(e) => setInput(e.target.value)}
          className=" resize-none flex-1 py-3  md:w-1/2 lg:flex-none "
        />
        <Button
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
          type="button"
          variant={"outline"}
        >
          <ImageIcon className=" h-4 w-4" />
        </Button>
        <Input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => {
            if (!e.target.files) return;
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            // set Image to be sent
          }}
        />
        <Button
          aria-label="Skicka"
          onClick={() => {
            sendMessage(userMessage);
            textAreaRef.current?.focus();
          }}
          className=""
          variant="outline"
        >
          <Send className=" h-4 w-4" />
        </Button>
      </div>
    </footer>
  );
};

export default ChatInput;

/*const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };*/

//const fileInputRef = useRef<HTMLInputElement | null>(null);
