import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { datasProps } from "./type";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function SheetReservation({ datas }: { datas: datasProps }) {
  const { rooms, sites, meetings } = datas;

  //Fonction pour compter le nombre de meeting par site
  const meetingsBySite = (siteId: number) => {
    const roomsId = rooms
      .filter((room) => room.siteId === siteId)
      .map((room) => room.id);
    const count = meetings.filter((meeting) =>
      roomsId.includes(meeting.roomId),
    ).length;
    return count;
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="w-10" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Vos réservations</SheetTitle>
        </SheetHeader>
        <Accordion type="single" collapsible>
          {sites.map((site) => (
            <AccordionItem value={site.name} key={site.id}>
              <AccordionTrigger>{site.name}</AccordionTrigger>
              <AccordionContent>
                <ul>
                  {rooms.map(
                    (room) =>
                      room.siteId === site.id && (
                        // Il faut enlever les soulignage et rendre responsive la page
                        <li key={room.id}>
                          <Link
                            href={`reservations?roomId=${room.id}`}
                            className="flex justify-between w-full"
                          >
                            <div className="flex gap-1">
                              <span className="text-2xs">{room.name}</span>
                            </div>
                            <Badge>
                              {
                                meetings.filter(
                                  (meeting) => meeting.roomId === room.id,
                                ).length
                              }
                            </Badge>
                          </Link>
                        </li>
                      ),
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SheetContent>
    </Sheet>
  );
}
