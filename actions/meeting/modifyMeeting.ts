"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import canModify from "@/lib/utils/meeting/canModify";
import meetingIsValid from "@/lib/utils/meeting/meetingIsValid";
import { MeetingFormDatas } from "@/app/(main)/home/site/[siteId]/room/[roomId]/type";
import z from "zod";

const meetingFormSchema = z.object({
  name: z
    .string()
    .min(1, "Veuillez choisir un nom d'évènement")
    .max(30, "30 charactères maximum"),
  hour_from: z.iso.time("Veuillez choisir une heure de début"),
  hour_to: z.iso.time("Veuillez choisir une heure de fin"),
  attendees: z.array(z.string()),
  roomId: z.number(),
});

export default async function (
  newMeeting: MeetingFormDatas,
  oldMeetingId: string,
) {
  const parsed = meetingFormSchema.safeParse(newMeeting);
  if (!parsed.success)
    return { success: false as const, message: "Données invalides" };
  const { name, hour_from, hour_to, roomId, attendees } = parsed.data;
  const id = oldMeetingId;
  try {
    //Obtenir la session
    const session = await auth();
    if (!session) throw new Error("Pas de session active");
    if (!session.user) throw new Error("Pas d'utilisateur connecté");
    if (!session.user.id) throw new Error("Pas d'id lié à l'utilisateur");
    const userId = session.user.id;

    //Obtenir les meetings par roomId
    const meetings = await prisma.meeting.findMany({
      where: {
        roomId,
      },
    });

    //Obtenir l'autheur par meeting ID
    const authorId = await prisma.meeting.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        authorId: true,
      },
    });

    //Si on ne trouve pas de meeting avec l'ID, on lance une erreur
    if (!authorId) throw new Error("Pas de réunion avec ce ID");

    //Si les données sont incorrectes, on lance une erreur
    if (!meetingIsValid(newMeeting, meetings))
      throw new Error("Les données de la réunion ne sont pas valides");

    //Vérification de l'auteur de la réunion pour modification
    if (!canModify(authorId.authorId, userId))
      throw new Error(
        "Vous ne pouvez pas modifier cette réunion, vous n'en êtes pas l'auteur",
      );

    //Update de la réunion
    const meetingUpdated = await prisma.meeting.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        hour_from,
        hour_to,
        roomId,
        attendees: {
          set: attendees.map((attendee) => ({ id: attendee })),
        },
      },
    });
    return {
      success: true,
      message: `La réunion ${meetingUpdated.name} a bien été mise à jour`,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
}
