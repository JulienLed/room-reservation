import { Meeting, User } from "@/generated/prisma/client";

export default function canDelete(
  meetingToDelete: Meeting,
  userConnectedId: string,
) {
  if (meetingToDelete.authorId !== userConnectedId) return false;
  return true;
}
