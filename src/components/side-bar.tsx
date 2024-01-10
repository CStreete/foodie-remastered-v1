import React from "react";

import { Button } from "./ui/button";
import { ChefHat, Heart, HomeIcon, LogOut, MessageSquare } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import Link from "next/link";
import { FoodieLogo } from "./foodie-icon";
import DarkModeToggle from "./dark-mode-toggle";
import { auth, signOut } from "@/auth";
import { currentUser } from "@/lib/currentUser";
import { redirect } from "next/navigation";
import CreateRecipie from "./recipe/create-recipe";

const SideBar = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <aside className=" flex flex-col w-0 h-0 lg:w-[300px] lg:h-screen  lg:fixed  ">
      <div className="flex  lg:items-end  lg:justify-start justify-center  relative  lg:w-32 ">
        <FoodieLogo
          priority
          src={"/Foodie-Logo.svg"}
          alt="Foodie Logo"
          loading="eager"
          quality={100}
          height={100}
          width={100}
          className=" lg:w-[100px] lg:h-[100px] w-[50px] h-[50px]  "
        />
        <span className=" hidden lg:block absolute right-0 font-bold bottom-2 text-2xl">
          oodie
        </span>
      </div>
      <div className=" bg-darkPink text-white lg:rounded-lg lg:mx-2 w-full lg:w-auto h-16 lg:h-auto  lg:mt-4 lg:space-y-5 lg:py-12 lg:mr-10 lg:ml-2  font-semibold flex flex-row lg:flex-col items-center lg:block lg:relative fixed bottom-0 justify-between  ">
        <Link href={"/home"} className="flex">
          <div className=" flex items-center  space-x-4  px-2 ml-2 mr-2 rounded-md h-12 hover:bg-gray-500/40 cursor-pointer w-full   ">
            <HomeIcon className=" " size={30} />
            <p className="  pt-2 lg:block hidden  ">Hem</p>
          </div>
        </Link>
        <div className=" flex items-center  space-x-4  px-2 ml-2 mr-2 rounded-md h-12 hover:bg-gray-500/40 cursor-pointer ">
          <MessageSquare size={30} />
          <p className=" lg:block hidden ">Meddelande</p>
        </div>

        <CreateRecipie />

        <div className=" hidden lg:flex items-center  space-x-4  px-2 ml-2 mr-2 rounded-md h-12 hover:bg-gray-500/40 cursor-pointer ">
          <Heart size={30} />
          <p className=" lg:block hidden  ">Aviseringar</p>
        </div>
        <Link href={"/ai"} className=" flex">
          <div className=" flex items-center w-full  space-x-4  px-2 ml-2 mr-2 rounded-md h-12 hover:bg-gray-500/40 cursor-pointer ">
            <ChefHat size={30} />
            <p className=" lg:block hidden  ">Min Ai</p>
          </div>
        </Link>
        <Link href={`${user.id}`} className=" flex">
          <div className=" flex items-center  space-x-4  px-2 ml-2 mr-2 rounded-md h-12 hover:bg-gray-500/40 cursor-pointer w-full ">
            <Avatar className=" w-[30px] h-[30px]">
              <AvatarImage alt="Avatar" src={user.image!!} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className=" pt-1 lg:block hidden  ">Profil</p>
          </div>
        </Link>
        <div className=" hidden lg:flex items-center  space-x-4  px-2 ml-2 mr-2 rounded-md h-12 hover:bg-gray-500/40 cursor-pointer ">
          <DarkModeToggle />
          <p>Växla utseende</p>
        </div>

        <div className=" hidden lg:flex  items-center  space-x-4  px-2 ml-2 mr-2 rounded-md h-12 hover:bg-gray-500/40 cursor-pointer ">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className=""
          >
            <Button className=" w-full text-white  p-0 bg-transparent hover:bg-transparent text-base shadow-none font-bold flex justify-center items-center ">
              <LogOut size={30} className=" lg:mr-5 " />
              <span className="hidden lg:block">Logga Ut</span>
            </Button>
          </form>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
