import getUserGuest from "@/lib/getGuestUsers";
import prismaClient from "@/lib/prisma/prisma";
import { auth } from "@clerk/nextjs";

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
    const data = await getUserGuest();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("Unauthorized", { status: 401 });
  }
}
