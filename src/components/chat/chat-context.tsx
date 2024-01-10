import React, { ChangeEvent, createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TMessage } from "@/db/schema/schema";
import { set } from "zod";

const defaultMessages: TMessage[] = [
  {
    id: uuidv4(),
    content:
      "Hejsan! Jag är Foodie, din personliga AI som hjälper dig med din mat. Ladda upp en bild på din mat eller ställ frågor till mig kopplat till matlagning så ska jag försöka hjälpa dig.",
    timestamp: new Date(),
    isUserMessage: false,
    userId: "",
  },
];

type ContextTypes = {
  addMessage: (messsage: TMessage) => void;
  messages: TMessage[];
  isMessageUpdating: boolean;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  setIsMessageUpdating: (isUpdating: boolean) => void;
};

export const ChatContext = createContext<ContextTypes>({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
});

interface ChatContextProviderProps {
  children: React.ReactNode;
}

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const [messages, setMessages] = useState(defaultMessages);
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);

  const addMessage = (message: TMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const updateMessage = (
    id: string,
    updateFn: (prevText: string) => string
  ) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return {
            ...message,
            content: updateFn(message.content),
          };
        }
        return message;
      })
    );
  };

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        isMessageUpdating,
        removeMessage,
        setIsMessageUpdating,
        updateMessage,
        messages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
