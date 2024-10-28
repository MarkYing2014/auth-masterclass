"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {
  const router = useRouter();
  const onClick = () => {
    if (mode === "redirect") {
      router.push("/auth/login");
    }
  };
  if (mode === "modal") {
    return <span> TODO: Modal </span>;
  }
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}{" "}
    </span>
  );
}
