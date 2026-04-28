"use client";

import { Tabs } from "./types";
import Day from "./Day";
import Month from "./Month";
import Week from "./Week";

export default function TimeGrid({ calendarView }: { calendarView: Tabs }) {
  switch (calendarView) {
    case "Jour":
      return <Day />;
    case "Semaine":
      return <Week />;
    case "Mois":
      return <Month />;
  }
}
