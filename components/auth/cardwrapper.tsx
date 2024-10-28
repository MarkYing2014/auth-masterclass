"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { ReactNode } from "react";
import Header from "@/components/auth/header";
import Social from "@/components/auth/social";

import { Button } from "../ui/button";

interface CardWrapperProps {
  children: ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backBottonHref?: string;
  showSocial?: boolean;
}

export default function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backBottonHref,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
        <CardHeader>
            <Header label={headerLabel} />
        </CardHeader>

        <CardContent>
            {children}
        </CardContent>

        {showSocial && (
        <CardFooter className="flex flex-col gap-2">
          <Social />
          <Button 
            variant="link"
            className="text-sm text-muted-foreground"
            asChild
          >
            <a href={backBottonHref || "#"}>{backButtonLabel || "Back"}</a>
          </Button>
        </CardFooter>
      )}

    </Card>
  );
}
