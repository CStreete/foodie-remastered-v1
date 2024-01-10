
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/schema-validator/account-credentials"

export const Register = ({
  setRegistration,
  router,
}: {
  setRegistration: React.Dispatch<React.SetStateAction<string>>
  router: AppRouterInstance
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const onSubmit = async ({
    email,
    password,
    firstName,
    lastName,
  }: TAuthCredentialsValidator) => {
    // fetch from server
   /* const res = await registerUser({
      email,
      password,
      firstName,
      lastName,
    })
    if (res === 200) {
      router.push("/home")
      return
    }*/
    alert("Wrong credentials")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <label className=" text-base" htmlFor="email">
        First Name
      </label>
      <Input
        {...register("firstName")}
        name="firstName"
        placeholder="First Name"
        className=" w-72 placeholder:text-white focus-visible:ring-0 focus-visible:outline-textPink focus-visible:border-none"
      />
      <label className=" text-base" htmlFor="email">
        Last Name
      </label>
      <Input
        {...register("lastName")}
        name="lastName"
        placeholder="Last Name"
        className=" w-72 placeholder:text-white  "
      />

      <label className=" text-base" htmlFor="email">
        Email
      </label>
      <Input
        {...register("email")}
        name="email"
        placeholder="you@example.com"
        className={cn(
          errors.email && "focus-visible:outline-red-500",
          " w-72 placeholder:text-white focus-visible:ring-0 focus-visible:outline-white focus-visible:border-none "
        )}
      />
      <label className=" text-base" htmlFor="email">
        Lösenord
      </label>
      <Input
        {...register("password")}
        type="password"
        name="password"
        placeholder="Email"
        className=" w-72 placeholder:text-white focus-visible:outline-none  "
      />

<div className=" flex flex-col items-center justify-center  mt-3">
        <Button size={"lg"} className=" w-72 text-base font-bold  ">
          Registrera
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
  )
}
