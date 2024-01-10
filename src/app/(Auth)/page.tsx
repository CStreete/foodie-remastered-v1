import { AuthProviders } from "@/components/auth/auth-providers";
import DarkModeToggle from "@/components/dark-mode-toggle";
import { FoodieLogo } from "@/components/foodie-icon";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import Image from "next/image";
import React from "react";

const Auth = async () => {
  return (
    <>
      <header className=" flex  items-end  relative  w-32">
        <FoodieLogo
          src={"/Foodie-Logo.svg"}
          alt="Foodie Logo"
          quality={100}
          height={100}
          width={100}
          className=" w-[100px]h-[100px]"
        />
        <span className=" absolute right-0 font-bold bottom-2 text-2xl">
          oodie
        </span>
      </header>
      <div className=" absolute right-0 top-0 p-16">
        <DarkModeToggle />
      </div>
      <MaxWidthWrapper>
        <div className=" flex flex-col items-center justify-center text-5xl lg:text-6xl font-bold ">
          <span className=" pr-20">DELA</span>
          <span className=" text-textPink">SMAKA</span>
          <span>UTVECKLAS</span>
          <p className=" text-lg lg:text-xl font-semibold max-w-lg text-center mt-5 lg:mt-10">
            Foodie skapades av ett gäng matälskare som ville dela med sig av
            egna recept och kunna njuta av andras fräcka tips!
          </p>
        </div>
        <div className=" flex flex-col justify-center items-center text-2xl mt-8 lg:mt-16 space-y-4">
          <AuthProviders />
        </div>
        <Image
          alt=""
          src={"/Vegtables2.png"}
          height={200}
          width={200}
          priority
          className=" lg:w-[400px] lg:h-[400px] absolute bottom-0 left-0 "
        />
      </MaxWidthWrapper>
    </>
  );
};

export default Auth;
