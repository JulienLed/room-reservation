//Composant qui affiche une réunion sur la page des réservations

import {
  getTimeFormatedToString,
  getMonthToString,
} from "@/lib/utils/temporal/temporalUtils";
import { MeetingWithAttendees } from "../home/site/[siteId]/room/[roomId]/type";
import { cn } from "@/lib/utils";

export default async function ShowMeeting({
  meeting,
}: {
  meeting: MeetingWithAttendees;
}) {
  const meetingStatus = (meeting: MeetingWithAttendees) => {
    const { hour_from, hour_to } = meeting;
    const now = new Date();
    if (hour_from > now) {
      return "A venir";
    } else if (hour_to < now) {
      return "Passée";
    } else {
      return "Aujourd'hui";
    }
  };

  const status = meetingStatus(meeting);

  return (
    <div className="flex gap-2 border items-center justify-evenly border-muted-foreground/20 rounded-md p-2">
      <section
        id="meeting-date-square"
        className="flex flex-col justify-center items-center leading-2 rounded-sm bg-primary-foreground p-1"
      >
        <span className="font-bold">{getMonthToString(meeting.hour_from)}</span>
        <span className="font-extrabold text-xl">
          {meeting.hour_from.getDate()}
        </span>
      </section>

      <section id="meeting-info" className="flex flex-col justify-between">
        <h4 className="font-bold">{meeting.name}</h4>
        <p className="text-muted-foreground">
          {`${getTimeFormatedToString(
            meeting.hour_from.getHours(),
            meeting.hour_from.getMinutes(),
          )} - ${getTimeFormatedToString(
            meeting.hour_to.getHours(),
            meeting.hour_to.getMinutes(),
          )}`}
          {" · "}
          <span>{`${meeting.attendees.length} participants`}</span>
        </p>
      </section>

      <section id="meeting-status">
        <p
          className={cn(
            "rounded-2xl py-1 px-2 font-extrabold",
            status === "A venir" && "bg-blue-500/50 text-blue-900",
            status === "Aujourd'hui" && "bg-green-500/50 text-green-900",
            status === "Passée" && "bg-muted text-muted-foreground",
          )}
        >
          {status}
        </p>
      </section>
    </div>
  );
}
