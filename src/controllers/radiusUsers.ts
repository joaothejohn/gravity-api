import { Request, Response } from "express";
import prisma from "../utils/prismaClient"

export async function getAllRadiusUsers(req: Request, res: Response) {
  const pageSize = Number(req.query.pageSize as string) || 100;
  const pageIndex = Number(req.query.pageIndex as string) || 0;

  const users = await prisma.radiusUser.findMany({
    skip: pageSize * pageIndex,
    take: pageSize,
  });

  res.json(users);
}

export async function getRadiusUsers(req: Request, res: Response) {
  const { domainId } = req.params;
  const pageSize = Number(req.query.pageSize as string) || 100;
  const pageIndex = Number(req.query.pageIndex as string) || 0;

  const domainExists = await prisma.domain.findUnique({
    where: { id: domainId },
  });

  if (!domainExists) {
    return res.status(400).json({ error: "DomainId invalid." });
  }

  const users = await prisma.radiusUser.findMany({
    where: { domainId },
    include: {
      plan: true,
      domain: true
    },
    skip: pageSize * pageIndex,
    take: pageSize,
  });

  const usersWithoutPlanDomainId = users.map(({ plan, planId, domainId, password, ...user }) => {
    const { domainId: nestedDomainId, ...restOfPlan } = plan || {};
    return { ...user, plan: restOfPlan };
  });
  
  res.json(usersWithoutPlanDomainId);
}

export async function getRadiusUserById(req: Request, res: Response) {
  const { domainId, userId } = req.params;

  const user = await prisma.radiusUser.findUnique({
    where: { id: userId, domainId },
    include: {
      plan: true,
      domain: true
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  const { plan, planId, domainId: removeDomainID, password, ...restOfUser } = user;
  const { domainId: planDomainId, ...restOfPlan } = plan || {};
  const userWithoutPlanDomainId = { ...restOfUser, plan: restOfPlan };
  
  res.json(userWithoutPlanDomainId);
}

export async function createRadiusUser(req: Request, res: Response) {
  const { domainId } = req.params;
  const newUserData = req.body;

  if (!newUserData.username || !newUserData.password) {
    return res.status(400).json({ error: "Username or Password invalid." });
  }

  const domainExists = await prisma.domain.findUnique({
    where: { id: domainId },
  });

  if (!domainExists) {
    return res.status(400).json({ error: "DomainId invalid." });
  }

  try {
    const user = await prisma.radiusUser.create({
      data: {
        ...newUserData,
        domainId,
      },
    });

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}

export async function deleteRadiusUser(req: Request, res: Response) {
  const { domainId, userId } = req.params;

  const user = await prisma.radiusUser.findUnique({
    where: { id: userId, domainId },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  try {
    await prisma.radiusUser.delete({
      where: { id: userId, domainId },
    });

    res.json({ message: "User removed." });
  } catch (error: any) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}
