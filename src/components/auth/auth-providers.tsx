"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import GoogleIcon from "../../../public/icons/google-icon";
import { Register } from "./register";
import { LogIn } from "./login";
import GitHubIcon from "../../../public/icons/github-icon";

export const AuthProviders = () => {
  const [registration, setRegistration] = useState<string>("");
  const router = useRouter();

  return (
    <div className=" flex flex-col justify-center items-center space-y-4 ">
      {!registration ? (
        <>
          <Button
            variant={"link"}
            disabled
            onClick={() => setRegistration("register")}
            className=" flex text-textPink   justify-center items-center cursor-pointer"
          >
            Vill du skapa ett konto? Registrera
            <ArrowRight className=" text-textPink ml-2 " size={20} />
          </Button>

          <div className="  flex justify-center items-center ">
            <Button
              onClick={() => setRegistration("login")}
              variant={"default"}
              size={"lg"}
              disabled
              className=" w-72 text-base font-bold  "
            >
              <span> E-post (Kommer snart) </span>
            </Button>
          </div>
          <div className=" relative flex justify-center items-center ">
            <Button
              onClick={() => signIn("google")}
              size={"lg"}
              className=" w-72 text-base font-bold"
            >
              <GoogleIcon className=" w-5 h-5 absolute left-0 ml-2  " /> Logga
              in med google
            </Button>
          </div>
          <div className=" relative flex justify-center items-center ">
            <Button
              onClick={() => signIn("github")}
              size={"lg"}
              className=" w-72 text-base font-bold"
            >
              <GitHubIcon className=" fill-secondary  rounded-full w-5 h-5 absolute left-0 ml-2  " />{" "}
              Logga in med github
            </Button>
          </div>
        </>
      ) : registration === "register" ? (
        <Register router={router} setRegistration={setRegistration} />
      ) : (
        <LogIn router={router} setRegistration={setRegistration} />
      )}
    </div>
  );
};
