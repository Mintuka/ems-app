import prismaClient from "@/lib/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { z } from "zod";

export async function DELETE(req: Request) {
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

    const { searchParams } = new URL(req.url);
    const term = z.string().trim().min(1).parse(searchParams.get("id"));
    const remove = await prismaClient.employee.update({
      where: {
        id: term,
      },
      data: {
        Teams: {
          disconnect: true,
        },
      },
    });
    return new Response(JSON.stringify(remove), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("Unauthorized", { status: 401 });
  }
}
