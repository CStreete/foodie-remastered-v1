"use client";
import React, { useContext, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ImageIcon, Send } from "lucide-react";
import { Input } from "../ui/input";
import { ChatContext } from "./chat-context";
import Image from "next/image";

interface ChatInputProps {
  isDisabled?: boolean;
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
  const {
    message,
    addMessage,
    handleInputChange,
    image,
    handleFileChange,
    isLoading,
  } = useContext(ChatContext);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <footer className="p-4 pb-20">
      <form className="flex items-center space-x-3 lg:justify-center">
        <Textarea
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              addMessage();
              textAreaRef.current?.focus();
            }
          }}
          ref={textAreaRef}
          autoFocus
          placeholder="Skriv ett meddelande till Foodie..."
          onChange={handleInputChange}
          className=" resize-none flex-1 py-3  md:w-1/2 lg:flex-none "
        />
        <Button onClick={handleButtonClick} type="button" variant={"outline"}>
          {image == "" ? (
            <ImageIcon className=" h-4 w-4" />
          ) : (
            <Image src={image} alt="User Image" height={20} width={20} />
          )}
        </Button>
        <Input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Button
          aria-label="Skicka"
          disabled={(image == "" && message == "") || isLoading}
          onClick={() => {
            addMessage();
            textAreaRef.current?.focus();
          }}
          className=""
          variant="outline"
        >
          <Send className=" h-4 w-4" />
        </Button>
      </form>
    </footer>
  );
};

export default ChatInput;
