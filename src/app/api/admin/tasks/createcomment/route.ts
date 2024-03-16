import { FormValuesTaskComment } from "@/components/taskid/Input";
import prismaClient from "@/lib/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const user = auth();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = (await req.json()) as FormValuesTaskComment;
    const getRole = await prismaClient.user.findUniqueOrThrow({
      where: {
        userID: user.userId!,
      },
      select: {
        role: true,
        Employee: {
          select: {
            teamsId: true,
            id: true,
          },
        },
      },
    });
    if (getRole.role !== "admin" || getRole.Employee?.teamsId === body.teamID) {
      console.log(getRole.Employee?.teamsId, body.teamID);
      return new Response("Unauthorized", { status: 401 });
    }
    const comment = await prismaClient.taskComments.create({
      data: {
        comment: body.message,
        taskID: body.taskId,
        employeeID: getRole.Employee?.id!,
      },
    });

    return new Response(JSON.stringify({ message: "Created SuccessFully" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response("Unauthorized", { status: 500 });
  }
}
