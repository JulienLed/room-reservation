import { SiteCreateInput } from "@/generated/prisma/models";
import { prisma } from "@/lib/prisma";

//Seed qui reprends les sites et les rooms

const sitesData: SiteCreateInput[] = [
  {
    name: "Cobralo",
    street: "Place du Chat-Botté",
    streetNum: 8,
    zip_code: 1180,
    rooms: {
      create: [
        {
          name: "Salle de réunion Cobralo 1",
        },
        {
          name: "Salle de réunion Cobralo 2",
        },
        {
          name: "Salle de réunion Cobralo 3",
        },
      ],
    },
  },
  {
    name: "Messidor",
    street: "Drève d'Anjou",
    streetNum: 8,
    zip_code: 1190,
    rooms: {
      create: [
        {
          name: "Salle de réunion Messidor 1",
        },
        {
          name: "Salle de réunion Messidor 2",
        },
      ],
    },
  },
  {
    name: "Kapelleveld",
    street: "Avenue Albert Dumont",
    streetNum: 10,
    zip_code: 1200,
    rooms: {
      create: [
        {
          name: "Salle de réunion Kapelleveld 1",
        },
        {
          name: "Salle de réunion Kapelleveld 2",
        },
        {
          name: "Salle de réunion Kapelleveld 3",
        },
      ],
    },
  },
  {
    name: "Les Locataires Réunis",
    street: "Avenue de Broqueville",
    streetNum: 258,
    zip_code: 1200,
    rooms: {
      create: [
        {
          name: "Salle de réunion Les Locataires Réunis 1",
        },
      ],
    },
  },
  {
    name: "Moortebeek",
    street: "Rue de Sévigné",
    streetNum: 8,
    zip_code: 1070,
    rooms: {
      create: [
        {
          name: "Salle de réunion Moortebeek 1",
        },
        {
          name: "Salle de réunion Moortebeek 2",
        },
      ],
    },
  },
];

export async function main() {
  for (let site of sitesData) {
    await prisma.site.create({ data: site });
  }
}

main();
