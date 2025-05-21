"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.includes("/dashboard");

  return (
    <AuthProvider>
      <main className="antialiased min-h-screen flex flex-col">
        <header className="relative z-50">
          <Navbar />
        </header>
        <div className="flex-grow">{children}</div>
        {!isDashboard && <Footer />}
      </main>
    </AuthProvider>
  );
}
