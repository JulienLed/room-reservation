import { Meeting, Room, Site } from "@/generated/prisma/client";

export type datasProps = {
  rooms: Room[];
  sites: Site[];
  meetings: Meeting[];
};
