import prismaClient from "@/lib/prisma/prisma";
import { NextRequest } from "next/server";
import { Webhook } from "svix";
const startDate = new Date("2023-01-01T00:00:00.000Z");
const endDate = new Date("2023-12-31T23:59:59.999Z");

export async function POST(req: NextRequest) {
  try {
    const data = await prismaClient.teamTask.findMany({
      where: {
        OR: [{}],
      },
    });
  } catch (error) {}
  return new Response("POST");
}
