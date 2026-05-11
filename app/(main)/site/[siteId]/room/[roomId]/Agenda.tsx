//Composant client pour afficher l'agenda via la lib schedule-x/react
"use client";

import "@schedule-x/theme-shadcn/dist/index.css";
import {
  CalendarEventExternal,
  createViewDay,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { MeetingWithAttendees, RoomWithSite, UsersWithIdAndName } from "./type";
import EventDialog from "./EventDialog";
import { useEffect, useState } from "react";
import "temporal-polyfill/global";

export default function Agenda({
  meetings,
  room,
  users,
  roomId,
}: {
  meetings: MeetingWithAttendees[];
  room: RoomWithSite;
  users: UsersWithIdAndName;
  roomId: number;
}) {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "update" | "delete">("create");
  const [eventDateTime, setEventDateTime] = useState<Temporal.ZonedDateTime>();
  const [event, setEvent] = useState<CalendarEventExternal>();

  //Fonction qui tranforme les meetings de la DB en events pour schedule-x calendar.
  const meetingsToEvents = () => {
    return meetings.map((meeting) => {
      return {
        id: meeting.id,
        start: Temporal.Instant.from(
          meeting.hour_from.toISOString(),
        ).toZonedDateTimeISO("Europe/Brussels"),
        end: Temporal.Instant.from(
          meeting.hour_to.toISOString(),
        ).toZonedDateTimeISO("Europe/Brussels"),
        title: meeting.name,
        location: `${room.site.street} ${room.site.streetNum} ${room.site.zip_code}`,
        people: meeting.attendees.map((attendee) => attendee.name),
        authorId: meeting.authorId,
      };
    });
  };

  const calendar = useNextCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
    events: meetingsToEvents(),
    dayBoundaries: {
      start: "08:00",
      end: "16:00",
    },
    weekOptions: { gridHeight: 500, nDays: 5 },
    locale: "fr-FR",
    timezone: "Europe/Berlin",
    theme: "shadcn",
    plugins: [eventsService],
    callbacks: {
      //Va ouvrir un Dialog pour créer un event
      onDoubleClickDateTime(dateTime: Temporal.ZonedDateTime, e?: UIEvent) {
        setOpen(true);
        setMode("create");
        setEventDateTime(dateTime);
      },
      //Va ouvrir un Dialog pour modifier l'event
      onDoubleClickEvent(calendarEvent, e?: UIEvent) {
        setOpen(true);
        setMode("update");
        setEvent(calendarEvent);
      },
    },
  });

  useEffect(() => {
    eventsService.set(meetingsToEvents());
  }, [meetings]);

  return (
    <div>
      <div className="relative z-0">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
      <EventDialog
        open={open}
        setOpen={setOpen}
        eventDateTime={eventDateTime}
        event={event}
        users={users}
        roomId={roomId}
        mode={mode}
      />
    </div>
  );
}
