import { Meeting } from "@/generated/prisma/client";

export default function meetingIsValid(
  newMeeting: Meeting,
  meetings: Meeting[],
) {
  if (newMeeting.hour_from > newMeeting.hour_to) return false;
  if (
    Number(newMeeting.hour_to) + 60 * 60 * 1000 <
    Number(newMeeting.hour_from)
  )
    return false;
  if (Number(new Date()) + 30 * 60 * 1000 >= Number(newMeeting.hour_from))
    return false;
  if (newMeeting.hour_to.getHours() > 16) return false;
  if (newMeeting.hour_from.getHours() < 8) return false;
  for (let meeting of meetings) {
    if (
      Number(meeting.hour_from) < Number(newMeeting.hour_from) &&
      Number(newMeeting.hour_from) < Number(meeting.hour_to)
    )
      return false;
  }
  for (let meeting of meetings) {
    if (
      Number(meeting.hour_from) > Number(newMeeting.hour_from) &&
      Number(meeting.hour_to) < Number(newMeeting.hour_to)
    )
      return false;
  }
  if (!newMeeting.name) return false;
  if (!newMeeting.date) return false;
  return true;
}
