import { auth } from "@/lib/auth";
import InfoSession from "./InfoSession";

export default async function Header() {
  const session = await auth();
  return (
    <div className="relative flex flex-col items-center">
      <h1>Application de réservation de salle</h1>
      <div className="absolute top-3 right-3">
        {/* Section où se trouve les infos visibles de la session si le user est connecté, sinon un bouton "Se connecter" */}
        <InfoSession session={session} />
      </div>
    </div>
  );
}
