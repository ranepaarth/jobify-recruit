import { prisma } from "@/lib/prisma";

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) return null;

  return user;
};

export const getUserByEmail = async (userEmail: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });

  if (!user) return null;

  return user;
};
