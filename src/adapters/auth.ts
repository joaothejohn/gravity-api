import { AuthResponse } from "../utils/authResponse";
import prisma from "../utils/prismaClient"

export async function authorizeUser(username: string, calledStationId: string) {
  const router = await prisma.domainRouter.findFirst({ where: { ip: calledStationId } });
  if (!router) throw new Error('Router not found');

  const user = await prisma.radiusUser.findFirst({
    where: {
      domainId: router.domainId,
      username: username
    }
  });
  if (!user) throw new Error('User not found');
  const response = new AuthResponse(user.password)

  response.framedIPAddress = user.ip;
  return response;
}