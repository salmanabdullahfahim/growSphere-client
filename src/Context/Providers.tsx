"use client";

import { UserProvider } from "@/Context/UserContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
