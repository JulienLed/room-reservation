import { describe, expect, test } from "vitest";
import meetingIsValid from "./meetingIsValid";

describe("meetingIsValid", () => {
  test("vérifie que l'heure de début est plus petite que l'heure de fin", () => {
    expect(
      meetingIsValid(
        //On donne un objet meeting fake
        {
          id: 1,
          name: "Réunion test",
          date: new Date("2026-04-25"),
          hour_from: new Date("2026-04-25T10:00:00"),
          hour_to: new Date("2026-04-25T09:00:00"),
          roomId: 1,
          authorId: "123456789",
        },
        [],
      ),
    ).toBe(false);
  });
  test("vérifie que l'heure de fin est au moins 1h plus grande que l'heure de début", () => {
    expect(
      meetingIsValid(
        {
          id: 1,
          name: "Réunion test",
          date: new Date("2026-04-25"),
          hour_from: new Date("2026-04-25T10:00:00"),
          hour_to: new Date("2026-04-25T09:30:00"),
          roomId: 1,
          authorId: "123456789",
        },
        [],
      ),
    ).toBe(false);
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
          date: in20Min,
          hour_from: in20Min,
          hour_to: in80Min,
          roomId: 1,
          authorId: "123456789",
        },
        [],
      ),
    ).toBe(false);
  });
  test("vérifie si l'heure de fin n'est pas après 16h le même jour", () => {
    expect(
      meetingIsValid(
        {
          id: 1,
          name: "Réunion test",
          date: new Date("2026-04-25"),
          hour_from: new Date("2026-04-25T15:00:00"),
          hour_to: new Date("2026-04-25T17:00:00"),
          roomId: 1,
          authorId: "123456789",
        },
        [],
      ),
    ).toBe(false);
  });
  test("vérifie si l'heure de début n'est pas avant 8h le même jour", () => {
    expect(
      meetingIsValid(
        {
          id: 1,
          name: "Réunion test",
          date: new Date("2026-04-25"),
          hour_from: new Date("2026-04-25T07:00:00"),
          hour_to: new Date("2026-04-25T09:00:00"),
          roomId: 1,
          authorId: "123456789",
        },
        [],
      ),
    ).toBe(false);
  });
  test("vérifie que l'heure de début ne soit pas entre l'heure de début et de fin d'une réunion existente", async () => {
    //Mocks datas d'un retour prisma
    let prismaDatas = [
      {
        id: 1,
        name: "Réunion test 1",
        date: new Date("2026-04-26"),
        hour_from: new Date("2026-04-26T09:00:00"),
        hour_to: new Date("2026-04-26T10:00:00"),
        roomId: 1,
        authorId: "123456789",
      },
      {
        id: 2,
        name: "Réunion test 2",
        date: new Date("2026-04-27"),
        hour_from: new Date("2026-04-27T10:00:00"),
        hour_to: new Date("2026-04-27T11:00:00"),
        roomId: 1,
        authorId: "123456789",
      },
      {
        id: 3,
        name: "Réunion test 3",
        date: new Date("2026-04-28"),
        hour_from: new Date("2026-04-28T13:00:00"),
        hour_to: new Date("2026-04-28T14:00:00"),
        roomId: 1,
        authorId: "123456789",
      },
    ];
    expect(
      meetingIsValid(
        {
          id: 4,
          name: "Réunion test 4",
          date: new Date("2026-04-28"),
          hour_from: new Date("2026-04-28T13:30:00"),
          hour_to: new Date("2026-04-28T15:00:00"),
          roomId: 1,
          authorId: "123456789",
        },
        prismaDatas,
      ),
    ).toBe(false);
  });
  test("vérifie que l'heure de début et l'heure de fin d'une réunion existante ne peut être compris entre l'heure de début et l'heure de fin de la nouvelle réunion", () => {
    //Mocks datas d'un retour prisma
    let prismaDatas = [
      {
        id: 1,
        name: "Réunion test 1",
        date: new Date("2026-04-26"),
        hour_from: new Date("2026-04-26T09:00:00"),
        hour_to: new Date("2026-04-26T10:00:00"),
        roomId: 1,
        authorId: "123456789",
      },
      {
        id: 2,
        name: "Réunion test 2",
        date: new Date("2026-04-27"),
        hour_from: new Date("2026-04-27T10:00:00"),
        hour_to: new Date("2026-04-27T11:00:00"),
        roomId: 1,
        authorId: "123456789",
      },
      {
        id: 3,
        name: "Réunion test 3",
        date: new Date("2026-04-28"),
        hour_from: new Date("2026-04-28T13:00:00"),
        hour_to: new Date("2026-04-28T14:00:00"),
        roomId: 1,
        authorId: "123456789",
      },
    ];
    expect(
      meetingIsValid(
        {
          id: 4,
          name: "Réunion test 4",
          date: new Date("2026-04-28"),
          hour_from: new Date("2026-04-28T12:00:00"),
          hour_to: new Date("2026-04-28T15:00:00"),
          roomId: 1,
          authorId: "123456789",
        },
        prismaDatas,
      ),
    ).toBe(false);
  });
  test("vérifie que name est rempli", () => {
    expect(
      meetingIsValid(
        {
          id: 4,
          name: null as any,
          date: new Date("2026-04-28T12:00:00"),
          hour_from: new Date("2026-04-28T12:00:00"),
          hour_to: new Date("2026-04-28T15:00:00"),
          roomId: 1,
          authorId: "123456789",
        },
        [],
      ),
    ).toBe(false);
  });
  test("vérifie que date est rempli", () => {
    expect(
      meetingIsValid(
        {
          id: 4,
          name: "Réunion test 1",
          date: null as any,
          hour_from: new Date("2026-04-28T12:00:00"),
          hour_to: new Date("2026-04-28T15:00:00"),
          roomId: 1,
          authorId: "123456789",
        },
        [],
      ),
    ).toBe(false);
  });
  test("vérifie que hour_from est rempli", () => {
    expect(
      meetingIsValid(
        {
          id: 4,
          name: "Réunion test 1",
          date: new Date("2026-04-28T12:00:00"),
          hour_from: null as any,
          hour_to: new Date("2026-04-28T15:00:00"),
          roomId: 1,
          authorId: "123456789",
        },
        [],
      ),
    ).toBe(false);
  });
  test("vérifie que hour_to est rempli", () => {
    expect(
      meetingIsValid(
        {
          id: 4,
          name: "Réunion test 1",
          date: new Date("2026-04-28T12:00:00"),
          hour_from: new Date("2026-04-28T12:00:00"),
          hour_to: null as any,
          roomId: 1,
          authorId: "123456789",
        },
        [],
      ),
    ).toBe(false);
  });
  test("vérifie que tout est ok", async () => {
    //Mocks datas d'un retour prisma
    let prismaDatas = [
      {
        id: 1,
        name: "Réunion test 1",
        date: new Date("2026-04-26"),
        hour_from: new Date("2026-04-26T09:00:00"),
        hour_to: new Date("2026-04-26T10:00:00"),
        roomId: 1,
        authorId: "123456789",
      },
      {
        id: 2,
        name: "Réunion test 2",
        date: new Date("2026-04-27"),
        hour_from: new Date("2026-04-27T10:00:00"),
        hour_to: new Date("2026-04-27T11:00:00"),
        roomId: 1,
        authorId: "123456789",
      },
      {
        id: 3,
        name: "Réunion test 3",
        date: new Date("2026-04-28"),
        hour_from: new Date("2026-04-28T13:00:00"),
        hour_to: new Date("2026-04-28T14:00:00"),
        roomId: 1,
        authorId: "123456789",
      },
    ];
    expect(
      meetingIsValid(
        {
          id: 4,
          name: "Réunion test 4",
          date: new Date("2026-04-29"),
          hour_from: new Date("2026-04-29T14:00:00"),
          hour_to: new Date("2026-04-29T15:00:00"),
          roomId: 1,
          authorId: "123456789",
        },
        prismaDatas,
      ),
    ).toBe(true);
  });
});
