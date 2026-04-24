//Page d'une salle

import { prisma } from "@/lib/prisma";
import RoomSchedule from "./RoomSchedule";

export default async function Page({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  //Obtention de l'Id de la room sous forme se string, provenant de l'url
  const { roomId } = await params;
  const roomIdNum = Number(roomId);

  //Obtention des réunions pour cette salle, grâce au roomId
  const meetings = await prisma.meeting.findMany({
    where: {
      roomId: roomIdNum,
    },
  });
  return (
    <div className="flex flex-col items-center w-full">
      <h2>Veuillez choisir un créneau disponible</h2>
      <section id="agenda" className="mx-auto w-5xl">
        {/* On passe meetings a un composant client Agenda */}
        <RoomSchedule meetings={meetings} />
      </section>
    </div>
  );
}
