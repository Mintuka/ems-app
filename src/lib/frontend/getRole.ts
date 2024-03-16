import prismaClient from "../prisma/prisma";

async function getRole(userId: string) {
  try {
    const res = await prismaClient.user.findUniqueOrThrow({
      where: {
        userID: userId,
      },
      select: {
        role: true,
      },
    });
    return res.role;
  } catch (error) {
    return null;
  }
}

export default getRole;
