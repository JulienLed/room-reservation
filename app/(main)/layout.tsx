//Ajout de Header.tsx dans le Layout
import Header from "@/components/layout/header/Header";
import React from "react";
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
    </>
  );
}
