import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foodie",
  description: "Skapa recept och dela med dina vänner",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={cn(" min-h-[100svh]  ", nunito.className)}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
