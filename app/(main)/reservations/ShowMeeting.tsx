import { prisma } from "@/lib/prisma";
import {
  getTimeFormatedToString,
  getMonthToString,
} from "@/lib/utils/temporal/temporalUtils";
import { MeetingWithAttendees } from "../home/site/[siteId]/room/[roomId]/type";

export default async function ShowMeeting({
  meeting,
}: {
  meeting: MeetingWithAttendees;
}) {
  return (
    <div className="flex gap-2 border border-muted-foreground/20 rounded-md p-2">
      <section
        id="date-square"
        className="flex flex-col justify-center items-center leading-2 rounded-sm bg-primary-foreground p-1"
      >
        <span className="font-bold">{getMonthToString(meeting.hour_from)}</span>
        <span className="font-extrabold text-xl">
          {meeting.hour_from.getDate()}
        </span>
      </section>

      <section id="meetin-info" className="flex flex-col justify-between">
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
    </div>
  );
}
