import { describe, expect, test } from "vitest";
import meetingIsValid from "./meetingIsValid";
import { ERRORS } from "./meetingErrors";

const now = new Date();

const makeTomorrowDateTime = (hour: number, minute = 0) => {
  const date = new Date(now);
  date.setDate(date.getDate() + 1);
  date.setHours(hour, minute, 0, 0);
  return date;
};

describe("meetingIsValid", () => {
  test("vérifie que l'heure de début est plus petite que l'heure de fin", () => {
    expect(
      meetingIsValid(
        //On donne un objet meeting fake
        {
          name: "Réunion test",
          hour_from: makeTomorrowDateTime(9),
          hour_to: makeTomorrowDateTime(8),
          roomId: 1,
          authorId: "123456789",
          attendees: [],
        },
        [],
      ),
    ).toStrictEqual({ success: false, message: ERRORS.HOUR_ORDER });
  });
  test("vérifie que l'heure de fin est au moins 1h plus grande que l'heure de début", () => {
    expect(
      meetingIsValid(
        {
          name: "Réunion test",
          hour_from: makeTomorrowDateTime(8),
          hour_to: makeTomorrowDateTime(8, 30),
          roomId: 1,
          authorId: "123456789",
          attendees: [],
        },
        [],
      ),
    ).toStrictEqual({ success: false, message: ERRORS.MIN_MEETING_TIME });
  });
  test("vérifie que l'heure de début est au plus tôt 30 minutes après maintenant", () => {
    let now = new Date();
    let in20Min = new Date(now.getTime() + 20 * 60 * 1000);
    let in80Min = new Date(now.getTime() + 80 * 60 * 1000);
    expect(
      meetingIsValid(
        {
          id: 1,
          name: "Réunion test",
          hour_from: in20Min,
          hour_to: in80Min,
          roomId: 1,
          authorId: "123456789",
          attendees: [],
        },
        [],
      ),
    ).toStrictEqual({ success: false, message: ERRORS.TOO_EARLY });
  });
  test("vérifie si l'heure de fin n'est pas après 16h le même jour", () => {
    expect(
      meetingIsValid(
        {
          id: 1,
          name: "Réunion test",
          hour_from: makeTomorrowDateTime(15),
          hour_to: makeTomorrowDateTime(17),
          roomId: 1,
          authorId: "123456789",
          attendees: [],
        },
        [],
      ),
    ).toStrictEqual({ success: false, message: ERRORS.HOUR_MAX });
  });
  test("vérifie si l'heure de début n'est pas avant 8h le même jour", () => {
    expect(
      meetingIsValid(
        {
          id: 1,
          name: "Réunion test",
          hour_from: makeTomorrowDateTime(7),
          hour_to: makeTomorrowDateTime(8),
          roomId: 1,
          authorId: "123456789",
          attendees: [],
        },
        [],
      ),
    ).toStrictEqual({ success: false, message: ERRORS.HOUR_MIN });
  });
  test("Vérifie que l'heure de début ne soit pas dans le passé", async () => {
    let now = new Date();
    const dateOneHourBefore = new Date(now.getTime() - 60 * 60 * 1000);
    const dateOneHourAfter = new Date(now.getTime() + 60 * 60 * 1000);
    expect(
      meetingIsValid(
        {
          id: 1,
          name: "Réunion test",
          hour_from: dateOneHourBefore,
          hour_to: dateOneHourAfter,
          roomId: 1,
          authorId: "123456789",
          attendees: [],
        },
        [],
      ),
    ).toStrictEqual({ success: false, message: ERRORS.HOUR_FROM_IN_PAST });
  });
  test("vérifie que l'heure de début ne soit pas entre l'heure de début et de fin d'une réunion existente", async () => {
    //Mocks datas d'un retour prisma
    let prismaDatas = [
      {
        id: 1,
        name: "Réunion test 1",
        hour_from: makeTomorrowDateTime(9),
        hour_to: makeTomorrowDateTime(10),
        roomId: 1,
        authorId: "123456789",
      },
      {
        id: 2,
        name: "Réunion test 2",
        hour_from: makeTomorrowDateTime(10),
        hour_to: makeTomorrowDateTime(11),
        roomId: 1,
        authorId: "123456789",
      },
      {
        id: 3,
        name: "Réunion test 3",
        hour_from: makeTomorrowDateTime(13),
        hour_to: makeTomorrowDateTime(14),
        roomId: 1,
        authorId: "123456789",
      },
    ];
    expect(
      meetingIsValid(
        {
          id: 4,
          name: "Réunion test 4",
          hour_from: makeTomorrowDateTime(13, 30),
          hour_to: makeTomorrowDateTime(15),
          roomId: 1,
          authorId: "123456789",
          attendees: [],
        },
        prismaDatas,
      ),
    ).toStrictEqual({ success: false, message: ERRORS.CONFLICT });
  });
  test("vérifie que l'heure de début et l'heure de fin d'une réunion existante ne peut être compris entre l'heure de début et l'heure de fin de la nouvelle réunion", () => {
    //Mocks datas d'un retour prisma
    let prismaDatas = [
      {
        id: 1,
        name: "Réunion test 1",
        hour_from: makeTomorrowDateTime(9),
        hour_to: makeTomorrowDateTime(10),
        roomId: 1,
        authorId: "123456789",
      },
      {
        id: 2,
        name: "Réunion test 2",
        hour_from: makeTomorrowDateTime(10),
        hour_to: makeTomorrowDateTime(11),
        roomId: 1,
        authorId: "123456789",
      },
      {
        id: 3,
        name: "Réunion test 3",
        hour_from: makeTomorrowDateTime(13),
        hour_to: makeTomorrowDateTime(14),
        roomId: 1,
        authorId: "123456789",
      },
    ];
    expect(
      meetingIsValid(
        {
          id: 4,
          name: "Réunion test 4",
          hour_from: makeTomorrowDateTime(12),
          hour_to: makeTomorrowDateTime(15),
          roomId: 1,
          authorId: "123456789",
          attendees: [],
        },
        prismaDatas,
      ),
    ).toStrictEqual({ success: false, message: ERRORS.CONFLICT });
  });
  test("vérifie que name est rempli", () => {
    expect(
      meetingIsValid(
        {
          id: 4,
          name: null as any,
          hour_from: makeTomorrowDateTime(12),
          hour_to: makeTomorrowDateTime(15),
          roomId: 1,
          authorId: "123456789",
          attendees: [],
        },
        [],
      ),
    ).toStrictEqual({ success: false, message: ERRORS.NAME });
  });
  test("vérifie que hour_from est rempli", () => {
    expect(
      meetingIsValid(
        {
          id: 4,
          name: "Réunion test 1",
          hour_from: null as any,
          hour_to: makeTomorrowDateTime(11),
          roomId: 1,
          authorId: "123456789",
          attendees: [],
        },
        [],
      ),
    ).toStrictEqual({ success: false, message: ERRORS.HOUR_FROM });
  });
  test("vérifie que hour_to est rempli", () => {
    expect(
      meetingIsValid(
        {
          id: 4,
          name: "Réunion test 1",
          hour_from: makeTomorrowDateTime(13),
          hour_to: null as any,
          roomId: 1,
          authorId: "123456789",
          attendees: [],
        },
        [],
      ),
    ).toStrictEqual({ success: false, message: ERRORS.HOUR_TO });
  });
  test("vérifie que tout est ok", async () => {
    //Mocks datas d'un retour prisma
    let prismaDatas = [
      {
        id: 1,
        name: "Réunion test 1",
        hour_from: makeTomorrowDateTime(9),
        hour_to: makeTomorrowDateTime(10),
        roomId: 1,
        authorId: "123456789",
      },
      {
        id: 2,
        name: "Réunion test 2",
        hour_from: makeTomorrowDateTime(10),
        hour_to: makeTomorrowDateTime(11),
        roomId: 1,
        authorId: "123456789",
      },
      {
        id: 3,
        name: "Réunion test 3",
        hour_from: makeTomorrowDateTime(13),
        hour_to: makeTomorrowDateTime(14),
        roomId: 1,
        authorId: "123456789",
      },
    ];
    expect(
      meetingIsValid(
        {
          id: 4,
          name: "Réunion test 4",
          hour_from: makeTomorrowDateTime(14),
          hour_to: makeTomorrowDateTime(15),
          roomId: 1,
          authorId: "123456789",
          attendees: [],
        },
        prismaDatas,
      ),
    ).toStrictEqual({ success: true, message: "La réunion est validée" });
  });
});
