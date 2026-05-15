//Fonction pour obtenir une heure formatée en string "00:00"sur base des heures et minutes en Number
export function getTimeFormatedToString(hour: number, minute: number) {
  const formatedHour = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  return formatedHour;
}
