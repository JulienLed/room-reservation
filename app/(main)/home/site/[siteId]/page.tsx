//Page d'un des sites
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import MainBreadcrumb from "@/components/layout/breadcrumb/MainBreadcrumb";

export default async function Page({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  //Obtention du slug de l'url ---> l'id du site
  const { siteId } = await params;
  const siteIdNum = Number(siteId);

  //Obtention des salles pour un site
  const rooms = await prisma.room.findMany({
    where: {
      siteId: siteIdNum,
    },
    include: {
      site: true,
    },
  });

  //Items à passer au breadcrumb
  const items = [
    {
      label: "Sélection du site",
      link: "/home",
    },
    {
      label: rooms[0].site.name,
      link: `/home/site/${siteId}`,
    },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full flex justify-start! pl-10">
        <MainBreadcrumb items={items} />
      </div>
      <h2>Veuillez sélectionner la salle</h2>
      <div className="grid grid-cols-2 gap-5 w-2xl">
        {/* Liens vers toutes les salles */}
        {rooms.map((room) => {
          return (
            <Link key={room.id} href={`/home/site/${siteId}/room/${room.id}`}>
              <Card className="hover:bg-accent duration-200">
                <CardHeader>
                  <CardTitle>{room.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
