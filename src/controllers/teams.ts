import { Request, Response } from "express";
import prisma from "../utils/prismaClient"

export async function getTeamBySlug(req: Request, res: Response) {
  const { slug } = req.params;

  const team = await prisma.team.findUnique({
    where: { slug },
  });

  if (!team) {
    return res.status(404).json({ error: "Team not found." });
  }

  res.json(team);
}