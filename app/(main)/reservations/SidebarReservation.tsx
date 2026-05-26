//Composant du Sidebar, qui sert de filtre pour l'affichage des réunions

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Meeting, Room, Site } from "@/generated/prisma/client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

type datasProps = {
  rooms: Room[];
  sites: Site[];
  meetings: Meeting[];
};

export default function SidebarReservation({ datas }: { datas: datasProps }) {
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
    <Sidebar variant="floating" className="h-fit mt-[10%] ml-[10%]">
      <SidebarHeader>Vos réservations</SidebarHeader>
      <SidebarContent>
        {sites.map((site) => (
          <Collapsible key={site.id} className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel>
                <CollapsibleTrigger className="w-full flex items-center gap-1">
                  <div className="flex items-center">
                    <ChevronDown className="transition-transform group-data-[state=open]/collapsible:rotate-180 w-3" />
                  </div>
                  <div className="flex items-center justify-between gap-1 w-full">
                    {site.name}
                    <Badge>{meetingsBySite(site.id)}</Badge>
                  </div>
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent className="ml-5 pl-1 border-l overflow-hidden">
                <SidebarGroupContent className="flex flex-col gap-2">
                  {rooms.map(
                    (room) =>
                      room.siteId === site.id && (
                        <SidebarMenu key={room.id}>
                          <SidebarMenuItem className="w-full flex gap-2 justify-between pr-2">
                            {/* On mets dans l'URL la roomId, pour pouvoir ensuite fetch les données de la db */}
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
                          </SidebarMenuItem>
                        </SidebarMenu>
                      ),
                  )}
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
