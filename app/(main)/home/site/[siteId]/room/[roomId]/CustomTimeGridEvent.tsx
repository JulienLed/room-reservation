// Composant custom d'évènements sur l'agenda

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getTimeFormatedToString } from "@/lib/utils/temporal/temporalUtils";

type props = {
  calendarEvent: {
    id: string | number;
    title: string;
    start: Temporal.ZonedDateTime;
    end: Temporal.ZonedDateTime;
    location: string;
    people: string[];
  };
};

//A continuer
export default function CustomTimeGridEvent({ calendarEvent }: props) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="absolute inset-0 h-full bg-primary text-primary-foreground px-2 rounded-xs border truncate">
          <h3>
            <strong>{calendarEvent.title}</strong>
          </h3>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top">
        <div className="w-80 h-fit">
          <ul>
            <li>
              <strong>
                De{" "}
                {getTimeFormatedToString(
                  calendarEvent.start.hour,
                  calendarEvent.start.minute,
                )}{" "}
                à{" "}
                {getTimeFormatedToString(
                  calendarEvent.end.hour,
                  calendarEvent.end.minute,
                )}
              </strong>
            </li>
            <li className="flex gap-1">
              <strong>Participants</strong> :{" "}
              {calendarEvent.people.map((attendee, index) => (
                <p key={index}>{attendee}</p>
              ))}
            </li>
            <li>
              <strong>Adresse</strong> : {calendarEvent.location}
            </li>
          </ul>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
