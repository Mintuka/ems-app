import { TeamSubmitType } from "@/components/Teams/Forms";
import prismaClient from "@/lib/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { z } from "zod";

export async function PUT(req: Request) {
  try {
    const user = auth();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const getRole = await prismaClient.user.findUniqueOrThrow({
      where: {
        userID: user.userId!,
      },
      select: {
        role: true,
      },
    });
    if (getRole.role !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const bodySafe = z
      .object({
        id: z.string(),
      })
      .parse(body);
    const res = await prismaClient.teamTask.findUnique({
      where: {
        id: bodySafe.id,
      },
      select: {
        done: true,
      },
    });
    const data = await prismaClient.teamTask.update({
      where: {
        id: bodySafe.id,
      },
      data: {
        done: res?.done ? false : true,
      },
    });
    return new Response(
      JSON.stringify({ message: `${res?.done ? "Ongoing" : "Completed"}` }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Unauthorized", { status: 401 });
  }
}
