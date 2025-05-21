"use client";

import { useAuth } from "@clerk/nextjs";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, userId } = useAuth();

  // You can add loading states here if needed
  if (!isLoaded) {
    return null;
  }

  return children;
}
