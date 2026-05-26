import { auth } from "@/lib/auth";
import InfoSession from "./InfoSession";
import { House } from "lucide-react";
import Link from "next/link";

export default async function Header() {
  const session = await auth();
  return (
    <div className="grid grid-cols-2 md:grid-cols-[27%_46%_27%]">
      <Link
        className="col-start-1 md:justify-self-start p-1 md:p-2"
        href={"/home"}
      >
        <House className="w-10 h-10 text-foreground" />
      </Link>
      <h1 className="row-start-2 md:row-start-1 md:col-start-2 col-span-2 md:col-span-1 mx-auto text-center">
        Application de réservation de salle
      </h1>
      <div className="md:justify-self-end p-2">
        {/* Section où se trouve les infos visibles de la session si le user est connecté, sinon un bouton "Se connecter" */}
        <InfoSession session={session} />
      </div>
    </div>
  );
}
