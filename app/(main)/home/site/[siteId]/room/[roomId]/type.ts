import { Prisma } from "@/generated/prisma/client";
import { CalendarEventExternal } from "@schedule-x/calendar";
import { createContext } from "react";

//Type de Room avec le Site correspondant
export type RoomWithSite = Prisma.RoomGetPayload<{ include: { site: true } }>;

//Type de Meeting avec les participants
export type MeetingWithAttendees = Prisma.MeetingGetPayload<{
  include: { attendees: true };
}>;

//Type de User avec id et name
export type UsersWithIdAndName = Record<string, string>[];

//Type du form, pas lié à Prisma car se sont des datas brutes. C'est la server action qui formatera pour la DB
export type MeetingFormDatas = {
  id?: number;
  name: string;
  hour_from: Date;
  hour_to: Date;
  attendees: string[];
  roomId: number;
  authorId?: string;
};

export const AgendaContext = createContext<{
  setOpen: (open: boolean) => void;
  setMode: (mode: "create" | "update") => void;
  setEvent: (calendarEvent: CalendarEventExternal) => void;
} | null>(null);
