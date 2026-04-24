"use server";

import { Meeting } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import meetingIsValid from "@/lib/utils/meeting/meetingIsValid";

export default async function (newMeeting: Meeting) {
  const { name, date, hour_from, hour_to, roomId } = newMeeting;

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

    //Si les données sont incorrectes, on lance une erreur
    if (!meetingIsValid(newMeeting, meetings))
      throw new Error("Les données de la réunion ne sont pas valides");

    //Créer la réunion
    const meeting = await prisma.meeting.create({
      data: {
        name,
        date,
        hour_from,
        hour_to,
        roomId,
        authorId: userId,
      },
    });
    return {
      success: true,
      message: `La réunion ${meeting.name} a bien été créée`,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
}
