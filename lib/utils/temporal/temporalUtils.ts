//Fonction pour obtenir le mois en string à partir du .getMonth()
export const getMonthToString = (date: Date) => {
  const monthToLowerString = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
  }).format(date);
  const monthToString =
    monthToLowerString.charAt(0).toUpperCase() + monthToLowerString.slice(1);
  return monthToString;
};

//Fonction pour obtenir une heure formatée en string "00:00"sur base des heures et minutes en Number
export function getTimeFormatedToString(hour: number, minute: number) {
  const formatedHour = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  return formatedHour;
}
