//Layout de Reservation, pour implémenter la SidebarReservation et la SheetReservation en fonction du responsive

import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarReservation from "./SidebarReservation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import MainBreadcrumb from "@/components/layout/breadcrumb/MainBreadcrumb";
import SheetReservation from "./SheetReservation";

export default async function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //Données du user à transmettre au composant SidebarReservation : les sites, les rooms, le nombre de meetings par room et salle, et les meetings
  const session = await auth();
  const rooms = await prisma.room.findMany({});
  const sites = await prisma.site.findMany({});
  const meetings = await prisma.meeting.findMany({
    where: {
      authorId: session!.user!.id,
    },
  });

  const datas = {
    rooms,
    sites,
    meetings,
  };

  //Items à passer au breadcrumb
  const items = [
    {
      label: "Vos réservations",
      link: "/reservations",
    },
  ];
  return (
    <>
      <div className="md:hidden flex justify-center w-full mt-2 animate-fade">
        <SheetReservation datas={datas} />
      </div>

      <SidebarProvider>
        <div className="hidden md:flex animate-fade">
          <SidebarReservation datas={datas} />
        </div>

        <main className="flex-1 flex flex-col w-full">{children}</main>
      </SidebarProvider>
    </>
  );
}
