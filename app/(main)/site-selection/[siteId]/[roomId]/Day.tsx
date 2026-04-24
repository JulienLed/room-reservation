//Composant client qui montre le type "Jour"
"use client";

export default function Day() {
  //Nombre de divisions d'une heure, heure de début et heure de fin
  const subdivisions = 4;
  const startHour = 8;
  const endHour = 16;

  //Création du tableau des subdivisions horaires
  const slots = Array.from(
    { length: (endHour - startHour) * subdivisions },
    (_, i) => startHour + i / subdivisions,
  );
  slots.push(16);

  //Formatage des heures et des minutes
  const formatSlots = slots.map((slot) => {
    const hour = Math.floor(slot);
    const minute = (slot % 1) * 60;
    return `${hour}h${minute.toString().padStart(2, "0")}`;
  });
  return (
    <div className="flex-1 grid grid-cols-[30%_70%] justify-items-center w-full">
      {formatSlots.map((slot) => (
        <>
          <div>{slot}</div>
          <div></div>
        </>
      ))}
    </div>
  );
}
