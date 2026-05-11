//Dialog pour créer un évènement

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EventForm from "./EventForm";
import { UsersWithIdAndName } from "./type";
import { CalendarEventExternal } from "@schedule-x/calendar";

export default function EventDialog({
  open,
  setOpen,
  eventDateTime,
  event,
  users,
  roomId,
  mode,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  eventDateTime?: Temporal.ZonedDateTime;
  event?: CalendarEventExternal;
  users: UsersWithIdAndName;
  roomId: number;
  mode: string;
}) {
  return (
    // Modal = false car sinon le combobox dans EventForm ne fonctionne pas
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      {open && <div className="fixed inset-0 w-full bg-black/70"></div>}
      <DialogContent
        className="z-100"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Nouvel évènement</DialogTitle>
          <DialogDescription>
            Définissez ici votre nouvel évènement
          </DialogDescription>
        </DialogHeader>
        <EventForm
          eventDateTime={eventDateTime}
          event={event}
          setOpen={setOpen}
          users={users}
          roomId={roomId}
          mode={mode}
        />
      </DialogContent>
    </Dialog>
  );
}
