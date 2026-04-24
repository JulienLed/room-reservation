import { describe, test, expect } from "vitest";
import canModify from "./canModify";
import { User } from "@/generated/prisma/client";

describe("canModify", () => {
  test("modifie la réunion uniquement si c'est l'auteur de celle-ci qui en fait la demande", () => {
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

    expect(canModify(oldMeeting, userConnectedId)).toBe(false);
  });
  test("modifie bien la réunion", () => {
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
    let userConnectedId: string = "123456789";

    expect(canModify(oldMeeting, userConnectedId)).toBe(true);
  });
});
