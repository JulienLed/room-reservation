//Page d'accueil sans user connecté

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Page() {
  const session = await auth();
  const user = session?.user?.name || "Nouveau visiteur";
  const sites = await prisma.site.findMany();

  return (
    <div className="flex flex-col items-center w-full">
      <h2>Bienvenue sur le site de réservation de salle.</h2>
      <p className="mb-5">Veuillez vous connecter pour réserver une salle.</p>
      <section
        id="connection-page-link"
        className="w-full flex-1 flex justify-center"
      >
        <Button>
          <Link href={"/sign-in"}>Se connecter</Link>
        </Button>
      </section>
    </div>
  );
}
