"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { default_login_redirect } from "@/routes";


export default function Social() {
  const onClick = async (provider: "google" | "github") => {
    try {
      await signIn(provider, {
        callbackUrl: default_login_redirect,
        redirect: true
      });
    } catch (error) {
      console.error("Social sign in error:", error);
    }
  };

  return (
    <div className="flex items-center gap-x-4 w-full">
      <Button
        size="lg"
        onClick={() => onClick("google")}
        variant="outline"
        className="w-full gap-x-2"
      >
        <FcGoogle />
        Google
      </Button>
      <Button
        size="lg"
        onClick={() => onClick("github")}
        variant="outline"
        className="w-full gap-x-2"
      >
        <FaGithub />
        Github
      </Button>
    </div>
  );
}
