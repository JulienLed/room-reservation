//Page d'une salle

import { prisma } from "@/lib/prisma";
import MainBreadcrumb from "@/components/layout/breadcrumb/MainBreadcrumb";
import Agenda from "./Agenda";

export default async function Page({
  params,
}: {
  params: Promise<{ siteId: string; roomId: string }>;
}) {
  //Obtention de l'Id de la room sous forme se string, provenant de l'url
  const { siteId, roomId } = await params;
  const roomIdNum = Number(roomId);

  //Obtention des réunions pour cette salle, grâce au roomId
  const meetings = await prisma.meeting.findMany({
    where: {
      roomId: roomIdNum,
    },
    include: {
      attendees: true,
    },
  });

  //Obtention de la liste des users, uniquement Id et name
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  //Obtention de la room et du site
  const room = await prisma.room.findUnique({
    where: {
      id: roomIdNum,
    },
    include: {
      site: true,
    },
  });

  //Items à passer au breadcrumb
  const items = [
    {
      label: "Sélection du site",
      link: "/",
    },
    {
      label: room!.site!.name,
      link: `/site/${siteId}`,
    },
    {
      label: room!.name,
      link: `/site/${siteId}/room/${roomId}`,
    },
  ];
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full flex justify-start! pl-10">
        <MainBreadcrumb items={items} />
      </div>
      <h2>Veuillez choisir un créneau disponible</h2>
      <section id="agenda" className="w-full px-5 pb-5 md:pb-10 md:px-10">
        <Agenda
          meetings={meetings}
          room={room!}
          users={users}
          roomId={roomIdNum}
        />
      </section>
    </div>
  );
}
