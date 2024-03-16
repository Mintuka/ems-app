import clerk, {
  UserWebhookEvent,
  WebhookEvent,
  WebhookEventType,
} from "@clerk/clerk-sdk-node";
import prismaClient from "@/lib/prisma/prisma";
import { User } from "@prisma/client";

export async function POST(req: Request) {
  try {
    // const token = req.headers.get("Bearer");
    // console.log("token",token)
    // if (token !== process.env.CLERK_SECRET_KEY) {
    //   throw new Error("Invalid token", { cause: "Invalid token" });
    // }
    // console.log(req)
    const payload = (await req.json()) as UserWebhookEvent;
    // console.log(payload)
    // if (payload.type !== "user.created") {
    //   console.log("My payload",payload)
    //   console.log("My payload",payload)
    //   console.log("My payload",payload)
    //   return new Response("Only user.created Events", { status: 400 });
    // }
    // if (payload.data.id === undefined) {
    //   throw new Error("No ID in Request", { cause: "Missing ID" });
    // }
    const create = await prismaClient.user.create({
      data: {
        userID: payload.data.id,
        firstName: payload.data.first_name,
        lastName: payload.data.last_name,
        email: payload.data.email_addresses[0].email_address,
        image_url: payload.data.profile_image_url,
      },
    });
    console.log(create)
    console.log(create)
    console.log(create)
    const metadata = await clerk.users.updateUser(payload.data.id, {
      privateMetadata: {
        role: "guest",
      },
    });
    console.log(payload.data);
    return new Response("POST");
  } catch (error: any) {
    if (error.message === "Invalid token") {
      return new Response("Invalid token", { status: 401 });
    } else if (error.message === "Missing ID") {
      return new Response("No ID in Request", { status: 400 });
    }
    console.log(error);
    return new Response("POST", { status: 401 });
  }
}
