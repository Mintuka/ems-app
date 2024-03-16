import { EditTaskFormType } from "@/components/teamsID/EditTaskForm";
import prismaClient from "@/lib/prisma/prisma";
import { auth } from "@clerk/nextjs";

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
    const body = (await req.json()) as EditTaskFormType;
    const update = await prismaClient.teamTask.update({
      where: {
        id: body.id,
      },
      data: {
        task: body.task,
        deadline: new Date(body.deadLine),
        description: body.description,
      },
    });
    // throw new Error("Not implemented");

    return new Response(JSON.stringify(update), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Unauthorized", { status: 401 });
  }
}
