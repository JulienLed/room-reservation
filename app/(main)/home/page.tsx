//Page d'accueil et de choix du site

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Page() {
  const session = await auth();
  const user = session?.user?.name || "Nouveau visiteur";
  const sites = await prisma.site.findMany();

  return (
    <div className="flex flex-col items-center w-full mb-5">
      <h2 className="text-center md:text-left">{`Bienvenue ${user} !`}</h2>
      <p className="mb-5 text-center">
        Vous pouvez ici réserver une salle de réunion parmis plusieurs sites de
        la société, à savoir :
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-5 w-[90%] md:w-2xl">
        {/* Liens vers tous les sites */}
        {sites.map((site) => {
          return (
            <Link key={site.id} href={`/home/site/${site.id}`}>
              <Card className="hover:bg-accent duration-200">
                <CardHeader>
                  <CardTitle>{site.name}</CardTitle>
                  <CardContent>
                    {site.street} {site.streetNum} {site.zip_code}
                  </CardContent>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
