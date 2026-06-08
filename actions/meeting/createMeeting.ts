"use server";

import { MeetingFormDatas } from "@/app/(main)/home/site/[siteId]/room/[roomId]/type";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import meetingIsValid from "@/lib/utils/meeting/meetingIsValid";
import z from "zod";

const meetingFormSchema = z.object({
  name: z
    .string()
    .min(1, "Veuillez choisir un nom d'évènement")
    .max(30, "30 charactères maximum"),
  hour_from: z.coerce.date("Veuillez choisir une heure de début"),
  hour_to: z.coerce.date("Veuillez choisir une heure de fin"),
  attendees: z.array(z.string()),
  roomId: z.number(),
});

export default async function (newMeeting: MeetingFormDatas) {
  const parsed = meetingFormSchema.safeParse(newMeeting);
  if (!parsed.success) {
    return { success: false as const, message: "Données invalides" };
  }

  const { name, hour_from, hour_to, attendees, roomId } = parsed.data;

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
      include: {
        attendees: true,
        author: true,
      },
    });

    //Si les données sont incorrectes, on return l'erreur qui provient de la fonction de vérification
    const response = meetingIsValid(newMeeting, meetings);
    if (!response.success)
      return { success: false as const, message: response.message };

    //Créer la réunion
    const meetingToCreate = await prisma.meeting.create({
      data: {
        name,
        hour_from,
        hour_to,
        roomId,
        authorId: userId,
        attendees: {
          connect: attendees.map((attendee) => ({ id: attendee })),
        },
      },
    });
    return {
      success: true as const,
      message: `La réunion ${meetingToCreate.name} a bien été créée`,
    };
  } catch (error) {
    console.log(error);
    return { success: false as const, message: error };
  }
}
