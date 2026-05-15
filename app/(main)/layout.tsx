//Ajout de Header.tsx dans le Layout
import Header from "@/components/layout/header/Header";
import React from "react";
import { Toaster } from "sonner";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="w-full">
        <Header />
      </header>
      <main>{children}</main>
      <Toaster position="top-center" />
    </>
  );
}
