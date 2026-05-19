import { describe, test, expect } from "vitest";
import canModify from "./canModify";
import { User } from "@/generated/prisma/client";

describe("canModify", () => {
  test("modifie la réunion uniquement si c'est l'auteur de celle-ci qui en fait la demande", () => {
    //Mocks datas de prisma pour un meeting
    let authorId = "123456789";

    //Mocks datas id du user dans la session
    let userConnectedId: string = "1234";

    expect(canModify(authorId, userConnectedId)).toBe(false);
  });
  test("modifie bien la réunion", () => {
    //Mocks datas de prisma pour un meeting
    let authorId = "123456789";

    //Mocks datas id du user dans la session
    let userConnectedId: string = "123456789";

    expect(canModify(authorId, userConnectedId)).toBe(true);
  });
});
