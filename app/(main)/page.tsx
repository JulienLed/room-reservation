//Page d'accueil sans user connecté

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Page() {
  const session = await auth();
  return (
    <div className="flex flex-col items-center w-full animate-fade-up">
      <h2 className="text-center">
        Bienvenue sur le site de réservation de salle.
      </h2>
      {!session ? (
        <div className="flex flex-col gap-2 md:gap-5 items-center">
          <p className="mb-5 text-center">
            Veuillez vous connecter pour réserver une salle.
          </p>
          <section
            id="connection-page-link"
            className="w-full flex-1 flex justify-center"
          >
            <Button asChild>
              <Link href={"/sign-in"}>Se connecter</Link>
            </Button>
          </section>
        </div>
      ) : (
        <div className="flex flex-col gap-2 md:gap-5 items-center">
          <p>Vous pouvez réserver votre salle.</p>
          <Button asChild>
            <Link href={"/home"}>Réserver une salle</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
