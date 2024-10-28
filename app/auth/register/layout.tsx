import { ReactNode } from "react";

export default function AuthLayout ({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-400 to-blue-800">
    {children}
    </div>;
}
