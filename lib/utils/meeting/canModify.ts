import { Meeting } from "@/generated/prisma/client";

export default function canModify(authorId: string, userConnectedId: string) {
  if (authorId !== userConnectedId) return false;

  return true;
}
