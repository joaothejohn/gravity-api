import { Request, Response, Router } from "express";

import { authenticateGet } from "../middleware/authGet";
import prisma from "../utils/prismaClient"

const router = Router();

router.route('/user/:username/mac/:calledStationId')
  .get(authenticateGet)

export default router;
