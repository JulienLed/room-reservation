import { Meeting } from "@/generated/prisma/client";

export default function canDelete(authorId: string, userConnectedId: string) {
  if (authorId !== userConnectedId) return false;
  return true;
}
