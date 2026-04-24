import { Meeting } from "@/generated/prisma/client";

export default function canModify(
  oldMeeting: Meeting,
  userConnectedId: string,
) {
  if (oldMeeting.authorId !== userConnectedId) return false;

  return true;
}
