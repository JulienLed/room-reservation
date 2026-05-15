import { auth } from "@/lib/auth";
import InfoSession from "./InfoSession";
import { House } from "lucide-react";
import Link from "next/link";

export default async function Header() {
  const session = await auth();
  return (
    <div className="relative flex flex-col items-center">
      <Link className="absolute top-3 left-50" href={"/home"}>
        <House className="w-10 h-10 text-foreground" />
      </Link>
      <h1>Application de réservation de salle</h1>
      <div className="absolute top-3 right-3">
        {/* Section où se trouve les infos visibles de la session si le user est connecté, sinon un bouton "Se connecter" */}
        <InfoSession session={session} />
      </div>
      <div className="w-full flex! justify-start! pl-10"></div>
    </div>
  );
}
