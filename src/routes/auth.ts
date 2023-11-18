import { Request, Response, Router } from "express";

import { authenticateGet } from "../middleware/authGet";
import prisma from "../utils/prismaClient"

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await prisma.radiusUser.findFirst({
    where: {
      username,
      password,
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  res.json(user);
})

router.route('/user/:username/mac/:calledStationId')
  .get(authenticateGet)
  .post(authenticateGet);

export default router;
