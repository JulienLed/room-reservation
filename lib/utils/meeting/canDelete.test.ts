import { describe, expect, test } from "vitest";
import canDelete from "./canDelete";

describe("canDelete", () => {
  test("supprime une réservation uniquement si elle est demandée par son auteur", () => {
    //Mocks datas de prisma pour un meeting
    let oldMeeting = {
      id: 1,
      name: "Réunion test 1",
      date: new Date("2026-04-26"),
      hour_from: new Date("2026-04-26T09:00:00"),
      hour_to: new Date("2026-04-26T10:00:00"),
      roomId: 1,
      authorId: "123456789",
    };

    //Mocks datas id du user dans la session
    let userConnectedId: string = "1234";

    expect(canDelete(oldMeeting, userConnectedId)).toBe(false);
  });
  test("a bien supprimé la réunion", () => {
    //Mocks datas de prisma pour un meeting
    let prismaData = {
      id: 1,
      name: "Réunion test 1",
      date: new Date("2026-04-26"),
      hour_from: new Date("2026-04-26T09:00:00"),
      hour_to: new Date("2026-04-26T10:00:00"),
      roomId: 1,
      authorId: "123456789",
    };

    //Mocks datas id du user dans la session
    let userConnectedId: string = "123456789";

    expect(canDelete(prismaData, userConnectedId)).toBe(true);
  });
});
