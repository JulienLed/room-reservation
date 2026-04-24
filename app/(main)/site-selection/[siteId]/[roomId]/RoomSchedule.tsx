//Composant client Agenda.tsx
//Montre toute l'interface de réservation de salle

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Meeting } from "@/generated/prisma/client";
import TimeGrid from "./TimeGrid";
import { useState } from "react";
import { Tabs } from "./types";

export default function RoomSchedule({ meetings }: { meetings: Meeting[] }) {
  const tabs = ["Jour", "Semaine", "Mois"] as const;
  const [calendarView, setCalendarView] = useState<Tabs>("Jour");
  return (
    <div className="flex-1 flex flex-col items-center w-full">
      <section id="fast-selector" className="flex justify-between w-full my-5">
        <Button>Aujourd'hui</Button>
        <section id="next-prev-btn">
          <Button>{"<"}</Button>
          <Button>{">"}</Button>
        </section>
      </section>
      <Card className="flex-1 flex flex-col items-center w-full">
        <ToggleGroup
          type="single"
          size={"lg"}
          className="w-[95%]"
          onValueChange={(value) => setCalendarView(value as Tabs)}
        >
          {tabs.map((tab, index) => (
            <ToggleGroupItem
              key={index}
              value={tab}
              className="flex-1 text-xl p-5"
            >
              {tab}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Separator />
        <TimeGrid calendarView={calendarView} />
      </Card>
    </div>
  );
}
