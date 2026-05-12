// Composant custom d'évènements sur l'agenda

type props = {
  calendarEvent: {
    id: string | number;
    title: string;
    start: string;
    end: string;
  };
};

//A continuer
export default function CustomTimeGridEvent({ calendarEvent }: props) {
  return (
    <div className="absolute inset-x-0 top-0 h-full bg-primary text-primary-foreground, p-10 rounded-xs border">
      {calendarEvent.title}
    </div>
  );
}
