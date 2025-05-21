import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";

import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "InezaPapetrie",
  description: "Fast to serve",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          logoImageUrl: "/logo-with-text.svg",
          logoLinkUrl: "/",
        },
        variables: {
          colorBackground: "#020821",
          colorInputText: "#ffffff",
          colorInputBackground: "#696b7544",
          colorText: "#ffffff",
        },
      }}
    >
      <html lang="en">
        <body className={`${GeistSans.className} antialiased bg-black-1`}>
          <header className="absolute top-0 left-0 right-0 z-50">
            <Navbar />
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
