import prismaClient from "./prisma/prisma";

async function getUserGuest() {
  try {
    const res = await prismaClient.user.findMany({
      where: {
        role: "guest",
      },
    });
    return res;
  } catch (error) {
    return null;
  }
}

export default getUserGuest;
