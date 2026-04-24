//Page de sélection du site
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Page() {
  //Obtention de tout les sites
  const sites = await prisma.site.findMany();
  return (
    <div className="flex flex-col items-center w-full">
      <h2>Veuillez sélectionner le site sur lequel réserver une salle</h2>
      <div className="grid grid-cols-2 gap-5 w-2xl">
        {/* Liens vers tout les sites */}
        {sites.map((site) => {
          return (
            <Link key={site.id} href={`site-selection/${site.id}`}>
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
