import { newComment } from "@/server/_actions/recipes/comment-recipie";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CommentFieldProps {
  recipieId: string;
}

export const CommentField = ({ recipieId }: CommentFieldProps) => {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      action={async () => {
        await newComment(recipieId, input);
        setInput("");
      }}
      className="flex flex-grow"
    >
      <Input
        className={cn(
          "flex-grow focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none border-none shadow-none"
        )}
        ref={inputRef}
        value={input}
        type="text"
        onChange={(e) => setInput(e.target.value)}
        placeholder="Skriv en kommentar..."
      />

      <Button disabled={input === ""} variant={"ghost"}>
        Publicera
      </Button>
    </form>
  );
};
