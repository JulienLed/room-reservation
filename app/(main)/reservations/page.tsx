//Page des réservations pour le user connecté

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ShowMeeting from "./ShowMeeting";
import Link from "next/link";
import { getDateFormatedToString } from "@/lib/utils/temporal/temporalUtils";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ roomId: string | null }>;
}) {
  //roomId est en string. Il faut le repasser en number à l'utilisation.
  const { roomId } = await searchParams;

  if (!roomId)
    return (
      <div className="flex-1 flex justify-center w-full">
        <p className="text-muted-foreground">Veuillez sélectionner une salle</p>
      </div>
    );

  //On va chercher les infos de la room via le roomId
  const room = await prisma.room.findUnique({
    where: {
      id: Number(roomId),
    },
  });

  if (!room) return notFound();

  //On va chercher le nom du siteId grace à roomId
  const siteId = await prisma.room
    .findUnique({
      where: {
        id: Number(roomId),
      },
      select: {
        siteId: true,
      },
    })
    .then((site) => (!site ? notFound() : site.siteId));

  //On va chercher les infos du site via le siteId
  const site = await prisma.site.findUnique({
    where: {
      id: siteId,
    },
  });

  if (!site) return notFound();

  //On va chercher les réunions qui se passent dans la salle sélectionnée
  const meetings = await prisma.meeting.findMany({
    where: {
      roomId: Number(roomId),
    },
    include: {
      attendees: true,
    },
    orderBy: {
      hour_from: "desc",
    },
  });

  return (
    <div className="flex flex-col w-[50%] mx-auto mt-5">
      <Card>
        <CardHeader>
          <CardTitle>{site.name}</CardTitle>
          <CardDescription>{`${site.street}, ${site.streetNum} - ${site.zip_code}`}</CardDescription>
        </CardHeader>
        <CardContent>
          <section id="room-reservations">
            <h3 className="text-base">{room.name}</h3>
            {meetings.length < 1 ? (
              <p>Pas de réunion dans cette salle</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {meetings.map((meeting) => (
                  <li key={meeting.id}>
                    <Link
                      href={`/home/site/${siteId}/room/${roomId}?date=${getDateFormatedToString(meeting.hour_from)}`}
                    >
                      <ShowMeeting meeting={meeting} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
