import clerk, { UserWebhookEvent } from "@clerk/clerk-sdk-node";
import prismaClient from "@/lib/prisma/prisma";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Bearer");
    if (token !== process.env.CLERK_SECRET_KEY) {
      throw new Error("Invalid token", { cause: "Invalid token" });
    }
    const payload = (await req.json()) as UserWebhookEvent;
    if (payload.type !== "user.updated") {
      return new Response("Only user.created Events", { status: 400 });
    }
    if (payload.data.id === undefined) {
      throw new Error("No ID in Request", { cause: "Missing ID" });
    }
    const update = await prismaClient.user.update({
      where: {
        userID: payload.data.id,
      },
      data: {
        firstName: payload.data.first_name,
        lastName: payload.data.last_name,
        email: payload.data.email_addresses[0].email_address,
        image_url: payload.data.profile_image_url,
      },
    });

    return new Response("POST");
  } catch (error: any) {
    if (error.message === "Invalid token") {
      return new Response("Invalid token", { status: 401 });
    } else if (error.message === "Missing ID") {
      return new Response("No ID in Request", { status: 400 });
    }
    console.log(error);
    return new Response("Error", { status: 400 });
  }
}
