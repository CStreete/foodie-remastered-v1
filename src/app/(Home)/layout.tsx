import SideBar from "@/components/side-bar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" flex px-0 lg:px-5">
      <SideBar />
      {children}
    </main>
  );
};

export default HomeLayout;
