"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import canDelete from "@/lib/utils/meeting/canDelete";

export default async function deleteMeeting(id: number) {
  try {
    //Obtenir la session
    const session = await auth();
    if (!session) throw new Error("Pas de session active");
    if (!session.user) throw new Error("Pas d'utilisateur connecté");
    if (!session.user.id) throw new Error("Pas d'id lié à l'utilisateur");
    const userId = session.user.id;

    //Obtenir l'ID de l'auteur de la réunion
    const author = await prisma.meeting.findUnique({
      where: {
        id,
      },
      select: {
        authorId: true,
      },
    });
    if (!author) throw new Error("Il n'y a pas de meeting associé à cet ID");

    //Vérification de l'auteur de la réunion pour suppression
    if (!canDelete(author.authorId, userId))
      throw new Error(
        "Vous ne pouvez pas supprimer cette réunion, vous n'en êtes pas l'auteur",
      );

    //Suppression de la réunion
    const responseDelete = await prisma.meeting.delete({
      where: {
        id,
      },
      select: {
        name: true,
      },
    });
    return {
      success: true,
      message: `La réunion ${responseDelete.name} a bien été annulée`,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
}
