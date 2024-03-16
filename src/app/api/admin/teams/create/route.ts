import { TeamSubmitType } from "@/components/Teams/Forms";
import prismaClient from "@/lib/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { create } from "domain";

export async function POST(req: Request) {
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
    const body = (await req.json()) as TeamSubmitType;
    // throw new Error("Not implemented");

    const data = await prismaClient.teams.create({
      data: {
        name: body.teamName,
        members: {
          connect: body.members.map((member) => ({ id: member })),
        },
      },
    });

    if (body.task) {
      await prismaClient.teamTask.create({
        data: {
          task: body.task,
          team: {
            connect: { id: data.id },
          },
          deadline: new Date(body.deadLine as Date),
        },
      });
    }
    console.log("done");
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Unauthorized", { status: 401 });
  }
}
