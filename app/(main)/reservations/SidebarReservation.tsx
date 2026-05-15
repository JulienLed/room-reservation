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
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Meeting, Room, Site } from "@/generated/prisma/client";
import { ChevronDown } from "lucide-react";

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
    <Sidebar variant="floating" className="h-fit mt-[10%]">
      <SidebarHeader>Vos réservations</SidebarHeader>
      <SidebarContent>
        {sites.map((site) => (
          <Collapsible key={site.id} className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel>
                <CollapsibleTrigger className="w-full flex justify-between">
                  <div className="flex gap-1">
                    {site.name}
                    <Badge>{meetingsBySite(site.id)}</Badge>
                  </div>
                  <ChevronDown className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent className="ml-5 pl-1 border-l overflow-hidden">
                <SidebarGroupContent className="flex flex-col gap-2">
                  {rooms.map(
                    (room) =>
                      room.siteId === site.id && (
                        <SidebarMenu key={room.id}>
                          <SidebarMenuItem className="w-full flex gap-2 justify-between pr-2">
                            <div className="flex gap-1">{room.name}</div>
                            <Badge>
                              {
                                meetings.filter(
                                  (meeting) => meeting.roomId === room.id,
                                ).length
                              }
                            </Badge>
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
