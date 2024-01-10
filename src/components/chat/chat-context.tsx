import React, { ChangeEvent, FormEvent, createContext, useState } from "react";
import { useToast } from "../ui/use-toast";
import { newChat } from "@/server/_actions/chat/create-chat";
import { useRouter } from "next/navigation";
import { set } from "zod";
import { newUserMessage } from "@/server/_actions/chat/new-message";
import { userMessages } from "@/server/_actions/chat/get-user-messages";

type ContextTypes = {
  addMessage: () => void;
  message: string;
  openAiResponse: string;
  image: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
};

export const ChatContext = createContext<ContextTypes>({
  addMessage: () => {},
  //Bild??
  message: "",
  openAiResponse: "",
  image: "",
  handleInputChange: () => {},
  handleFileChange: () => {},
  isLoading: false,
});

interface ChatContextProviderProps {
  children: React.ReactNode;
}

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const [message, setMessage] = useState<string>("");
  const [openAiResponse, setOpenAiResponse] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    if (image === "") {
      toast({
        title: "Du måste välja en bild",
        description: "Välj en bild att skicka till Foodie",
      });
      return;
    }

    let body = "";
    if (image) {
      const content = [
        {
          type: "image_url",
          image_url: {
            url: image,
          },
        },
        {
          type: "text",
          text: message,
        },
      ];
      body = JSON.stringify({ content });
    } else {
      body = JSON.stringify({ content: message });
    }

    setMessage("");

    await newUserMessage(message);

    const { data } = await userMessages();

    await fetch("/api/foodieai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    }).then(async (res) => {
      const reader = res.body?.getReader();

      while (true) {
        const { done, value } = await (reader?.read() as Promise<
          ReadableStreamReadResult<Uint8Array>
        >);
        if (done) {
          setIsLoading(false);
          break;
        }

        var currentChunk = new TextDecoder().decode(value);
        setOpenAiResponse((prev) => prev + currentChunk);
      }
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log(reader.result);
      return setImage(reader.result as string);
    };
  };

  const addMessage = () => handleSubmit();

  return (
    <ChatContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
        handleFileChange,
        image,
        openAiResponse,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
