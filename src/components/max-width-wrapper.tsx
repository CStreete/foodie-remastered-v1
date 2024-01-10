import { cn } from "@/lib/utils";
import React from "react";

export const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <main className={cn("mx-auto  px-5", className)}>{children}</main>;
};
