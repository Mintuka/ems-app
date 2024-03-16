import { SelectFormProps } from "@/components/teamsID/FormAddEmployer";
import prismaClient from "@/lib/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { z } from "zod";

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
    const body = (await req.json()) as SelectFormProps;
    const addEmployer = await prismaClient.teams.update({
      where: {
        id: body.id,
      },
      data: {
        members: {
          connect: {
            id: body.employee,
          },
        },
      },
    });
    return new Response(JSON.stringify({ message: "Employee Added!" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response("Unauthorized", { status: 401 });
  }
}
