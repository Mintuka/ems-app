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
      },
    });
    if (getRole.role !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const term = z
      .string()
      .trim()
      .min(1)
      .optional()
      .nullable()
      .parse(searchParams.get("term"));
    if (!term) {
      const data = await prismaClient.timekeeping.findMany({
        select: {
          id: true,

          timeIn: true,
          timeOut: true,
          employeeID: true,
          verified: true,
          employee: {
            select: {
              firstName: true,
              lastName: true,
              phone: true,
              email: true,
            },
          },
        },
      });
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      const data = await prismaClient.timekeeping.findMany({
        where: {
          employee: {
            firstName: {
              contains: term,
            },
          },
        },
        select: {
          id: true,

          timeIn: true,
          timeOut: true,
          verified: true,
          employeeID: true,
          employee: {
            select: {
              firstName: true,
              lastName: true,
              phone: true,
              email: true,
            },
          },
        },
      });
      return new Response(JSON.stringify(data), { status: 200 });
    }
  } catch (error) {
    console.log(error);

    return new Response("Unauthorized", { status: 401 });
  }
}
