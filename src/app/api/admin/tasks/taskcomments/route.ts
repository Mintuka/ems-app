import prismaClient from "@/lib/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { z } from "zod";

export async function GET(req: Request) {
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
        Employee: {
          select: {
            teamsId: true,
            id: true,
          },
        },
      },
    });
    const { searchParams } = new URL(req.url);
    const teamid = z.string().trim().min(1).parse(searchParams.get("teamid"));
    const taskid = z.string().trim().min(1).parse(searchParams.get("taskid"));
    if (getRole.role !== "admin" && getRole.Employee?.teamsId !== teamid) {
      return new Response("Unauthorized", { status: 401 });
    }

    const data = await prismaClient.taskComments.findMany({
      where: { taskID: taskid },
      include: {
        employee: {
          select: {
            firstName: true,
            lastName: true,
            photo: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const parsedData = data.map((comment) => {
      if (comment.employeeID === getRole.Employee?.id) {
        return {
          ...comment,
          isOwner: true,
          createdAt: comment.createdAt.toISOString(),
          updatedAt: comment.updatedAt.toISOString(),
        };
      } else {
        return {
          ...comment,
          isOwner: false,
          createdAt: comment.createdAt.toISOString(),
          updatedAt: comment.updatedAt.toISOString(),
        };
      }
    });
    // console.log(parsedData);
    return new Response(JSON.stringify(parsedData), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("Unauthorized", { status: 500 });
  }
}
