import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { redirect, useRouter } from "next/navigation";
import { NextRouter } from "next/router";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  LoginCredentialsValidator,
  TLoginCredentialsValidator,
} from "@/schema-validator/account-credentials";

export const LogIn = ({
  setRegistration,
  router,
}: {
  setRegistration: React.Dispatch<React.SetStateAction<string>>;
  router: AppRouterInstance;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginCredentialsValidator>({
    resolver: zodResolver(LoginCredentialsValidator),
  });

  const onSubmit = async ({ email, password }: TLoginCredentialsValidator) => {
    /*const response = await login({
      email,
      password,
    })

    if (response === 200) {
      router.push("/home")
      return
    }*/
    alert("Wrong credentials");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <label className=" text-base" htmlFor="email">
        Email
      </label>
      <Input
        {...register("email")}
        name="email"
        required
        placeholder="you@example.com"
        className={cn(
          errors.email && "focus-visible:outline-red-500",
          " w-72 placeholder:text-white focus-visible:ring-0 focus-visible:outline-foreground focus-visible:border-none "
        )}
      />
      <div className=" flex flex-col">
        <span className=" text-textPink  text-sm pt-1">
          {errors?.email?.message}
        </span>

        <label className=" text-base" htmlFor="email">
          Lösenord
        </label>
        <Input
          {...register("password")}
          type="password"
          name="password"
          required
          placeholder="Email"
          className={cn(
            errors.password && "focus-visible:outline-red-500",
            " w-72 placeholder:text-white focus-visible:ring-0 focus-visible:outline-foreground focus-visible:border-none "
          )}
        />
        <span className=" text-textPink text-sm pt-1">
          {errors?.password?.message}
        </span>
      </div>
      <div className=" flex flex-col items-center justify-center  mt-3">
        <Button size={"lg"} className=" w-72 text-base font-bold  ">
          Logga in
        </Button>

        <Button
          onClick={() => setRegistration("")}
          size={"lg"}
          className=" w-72 mt-3 text-base font-bold bg-textPink text-white shadow-white/25 hover:bg-buttonPink hover:text-white hover:font-semibold "
        >
          Tillbaka
        </Button>
      </div>
    </form>
  );
};
