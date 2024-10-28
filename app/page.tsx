"use client";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LoginButton from "@/components/auth/login-button";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-poppins",
});

export default function Home() {
 

  return (
      <main
      className={cn(
        "flex h-full flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-blue-800",
        poppins.className
      )}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            poppins.className
          )}
        >
          Auth 🔑
        </h1>
        <p className="text-white/60 drop-shadow-md text-lg pt-4">
          A simple auth app.
        </p>
        <LoginButton>
        <Button size="lg" variant="secondary" className="text-black mt-4 px-8">
          Sign in
        </Button>
        </LoginButton>
      </div>
    </main>
  );
}
