import { Request, Response } from "express";
import prisma from "../utils/prismaClient"

export async function getAllPlans(req: Request, res: Response) {
  const pageSize = Number(req.query.pageSize as string) || 100;
  const pageIndex = Number(req.query.pageIndex as string) || 0;

  const plans = await prisma.plan.findMany({
    include: {
      radiusUser: true
    },
    skip: pageSize * pageIndex,
    take: pageSize,
  });

  res.json(plans);
}

export async function getDomainPlans(req: Request, res: Response) {
  const { domainId } = req.params;
  const pageSize = Number(req.query.pageSize as string) || 100;
  const pageIndex = Number(req.query.pageIndex as string) || 0;

  const domainExists = await prisma.domain.findUnique({
    where: { id: domainId },
  });

  if (!domainExists) {
    return res.status(400).json({ error: "Invalid DomainId." });
  }

  const plans = await prisma.plan.findMany({
    where: { domainId },
    skip: pageSize * pageIndex,
    take: pageSize,
  });

  res.json(plans);
}

export async function getPlanById(req: Request, res: Response) {
  const { domainId, planId } = req.params;

  const plan = await prisma.plan.findUnique({
    where: { id: planId, domainId },
  });

  if (!plan) {
    return res.status(404).json({ error: "Plan not found." });
  }

  res.json(plan);
}

export async function createPlan(req: Request, res: Response) {
  const { domainId } = req.params;
  const newPlan = req.body;

  if (!domainId) {
    return res.status(400).json({ error: "Missing domainId." });
  }

  if (!newPlan.name) {
    return res.status(400).json({ error: "Name is required." });
  }

  const domainExists = await prisma.domain.findUnique({
    where: { id: domainId },
  });

  if (!domainExists) {
    return res.status(400).json({ error: "DomainId invalid." });
  }

  try {
    const plan = await prisma.plan.create({
      data: {
        ...newPlan,
        domainId,
      },
    });

    res.json(plan);
  } catch (error: any) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}

export async function deletePlanById(req: Request, res: Response) {
  const { domainId, planId } = req.params;

  const plan = await prisma.plan.findUnique({
    where: { id: planId, domainId },
  });

  if (!plan) {
    return res.status(404).json({ error: "Plan not found." });
  }

  try {
    await prisma.plan.delete({
      where: { id: planId, domainId },
    });

    res.json({ message: "Plan removed." });
  } catch (error: any) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}
