import prismaClient from "@/lib/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { RequestType } from "@prisma/client";

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
      const data = await prismaClient.request.findMany({
        include: {
          employee: true,
        },
      });
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      let type: RequestType | null = null;

      switch (term.toLowerCase()) {
        case "vacation":
          type = RequestType.Vacation;
          break;
        case "sick":
          type = RequestType.Sick;
          break;
        case "documents":
          type = RequestType.Documents;
          break;
        case "other":
          type = RequestType.Other;
          break;
        case "training":
          type = RequestType.Training;
          break;
        case "raise":
          type = RequestType.Raise;
          break;
        case "department":
          type = RequestType.Department;
          break;

        default:
          type = null;
      }
      const data = await prismaClient.request.findMany({
        where: {
          OR: [
            {
              employee: {
                firstName: {
                  contains: term as string,
                },
                lastName: {
                  contains: term as string,
                },
                email: {
                  contains: term as string,
                },
              },
            },
            {
              type: type!,
            },
          ],
        },
        include: {
          employee: true,
        },
      });
      return new Response(JSON.stringify(data), { status: 200 });
    }
  } catch (error) {
    console.log(error);

    return new Response("Unauthorized", { status: 401 });
  }
}
