import { MeetingFormDatas } from "@/app/(main)/home/site/[siteId]/room/[roomId]/type";
import { Meeting } from "@/generated/prisma/client";
import { ERRORS } from "./meetingErrors";

export default function meetingIsValid(
  newMeeting: MeetingFormDatas,
  meetings: Meeting[],
) {
  if (!newMeeting.name) return { success: false, message: ERRORS.NAME };
  if (!newMeeting.hour_from)
    return { success: false, message: ERRORS.HOUR_FROM };
  if (!newMeeting.hour_to) return { success: false, message: ERRORS.HOUR_TO };
  if (Number(newMeeting.hour_from) < Number(new Date()))
    return { success: false, message: ERRORS.HOUR_FROM_IN_PAST };
  if (newMeeting.hour_from > newMeeting.hour_to)
    return { success: false, message: ERRORS.HOUR_ORDER };
  if (Number(new Date()) + 30 * 60 * 1000 >= Number(newMeeting.hour_from))
    return { success: false, message: ERRORS.TOO_EARLY };
  if (
    Number(newMeeting.hour_to) - Number(newMeeting.hour_from) <
    60 * 60 * 1000
  )
    return { success: false, message: ERRORS.MIN_MEETING_TIME };

  if (newMeeting.hour_to.getHours() > 16)
    return { success: false, message: ERRORS.HOUR_MAX };
  if (newMeeting.hour_from.getHours() < 8)
    return { success: false, message: ERRORS.HOUR_MIN };
  for (let meeting of meetings) {
    if (
      Number(meeting.hour_from) < Number(newMeeting.hour_from) &&
      Number(newMeeting.hour_from) < Number(meeting.hour_to)
    )
      return { success: false, message: ERRORS.CONFLICT };
  }
  for (let meeting of meetings) {
    if (
      Number(meeting.hour_from) > Number(newMeeting.hour_from) &&
      Number(meeting.hour_to) < Number(newMeeting.hour_to)
    )
      return { success: false, message: ERRORS.CONFLICT };
  }
  return { success: true, message: "La réunion est validée" };
}
