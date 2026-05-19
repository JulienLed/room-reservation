import { describe, expect, test } from "vitest";
import canDelete from "./canDelete";

describe("canDelete", () => {
  test("supprime une réservation uniquement si elle est demandée par son auteur", () => {
    //Mocks datas de prisma pour un meeting
    let authorId = "123456789";

    //Mocks datas id du user dans la session
    let userConnectedId: string = "1234";

    expect(canDelete(authorId, userConnectedId)).toBe(false);
  });
  test("a bien supprimé la réunion", () => {
    //Mocks datas de prisma pour un meeting
    let authorId = "123456789";

    //Mocks datas id du user dans la session
    let userConnectedId: string = "123456789";

    expect(canDelete(authorId, userConnectedId)).toBe(true);
  });
});
