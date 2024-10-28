import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-poppins",
});

interface HeaderProps {
    label: string;
}

export default function Header({ label }: HeaderProps) {
  return (
    <div className={cn("text-2xl items-center w-full gap-y-4 font-semibold", poppins.className)}>
       <h1 className="text-4xl font-bold">🔒 Auth</h1>
       <h1 className="text-xl text-muted-foreground">{label}</h1>
    </div>
  );
}
