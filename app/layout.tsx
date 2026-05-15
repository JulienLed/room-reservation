//Layout principal

import type { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const montserratHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});

const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Réservation de salle",
  description: "Application de réservation de salle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn(
        "font-sans",
        nunitoSans.variable,
        montserratHeading.variable,
      )}
    >
      <body className="flex flex-col items-center min-h-screen">
        <main className="flex-1 flex flex-col w-full">
          <TooltipProvider>{children}</TooltipProvider>
        </main>
      </body>
    </html>
  );
}
