"use client";
import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useRef,
  useState,
} from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ImageIcon, Send } from "lucide-react";
import { FoodieLogo } from "../foodie-icon";
import { User } from "@auth/core/types";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollArea } from "../ui/scroll-area";

interface FoodieAiProps {
  user: User;
}

interface Message {
  content: string;
  isUser: boolean;
}

export const FoodieAi = ({ user }: FoodieAiProps) => {
  const [openAiResponse, setOpenAiResponse] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [sent, setSent] = useState<boolean>(false);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    if (image === "") {
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
          break;
        }

        var currentChunk = new TextDecoder().decode(value);
        setOpenAiResponse((prev) => prev + currentChunk);
      }
    });
  };

  return (
    <Fragment>
      <ScrollArea className="flex-1 p-4 space-y-4 h-full">
        <div className="flex items-end space-x-2">
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
            <p className="text-xs text-gray-500 mt-1">10:15 AM</p>
          </div>
        </div>

        {sent ? (
          <div className="flex items-end justify-end space-x-2">
            <div className="flex-1 text-right">
              <div className="p-3 rounded-lg flex justify-end">
                <Image src={image} alt="User Image" height={300} width={300} />
              </div>
              <p className="p-3 rounded-lg  ">{message}</p>
              <p className="text-xs text-gray-500 mt-1">10:16 AM</p>
            </div>
            <div className="flex-none">
              <Avatar className="w-8 h-8">
                <AvatarImage alt="User" src={user.image as string} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        ) : null}

        {openAiResponse !== "" ? (
          <div className="flex items-end space-x-2">
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
              <div className="p-3 rounded-lg lg:max-w-[600px] text-left  ">
                <Markdown remarkPlugins={[remarkGfm]}>
                  {openAiResponse}
                </Markdown>
              </div>
              <p className="text-xs text-gray-500 mt-1">10:15 AM</p>
            </div>
          </div>
        ) : null}
      </ScrollArea>

      <footer className="p-4 pb-20">
        <form
          onSubmit={handleSubmit}
          className="flex items-center space-x-3 lg:justify-center"
        >
          <Textarea
            value={message}
            autoFocus
            placeholder="Skriv ett meddelande till Foodie..."
            onChange={(e) => setMessage(e.target.value)}
            className=" resize-none flex-1 py-3  md:w-1/2 lg:flex-none "
          />
          <Button onClick={handleButtonClick} type="button" variant={"outline"}>
            {image == "" ? (
              <ImageIcon />
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
            disabled={image == "" && message == ""}
            className=""
            variant="outline"
          >
            <Send className=" h-4 w-4" />
          </Button>
        </form>
      </footer>
    </Fragment>
  );
};
