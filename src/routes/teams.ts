import express from "express";
import { getTeamBySlug } from "../controllers/teams";

const router = express.Router();

/**
 * @openapi
 * /teams/slug/{slug}:
 *   get:
 *     tags:
 *       - Teams
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: pageSize
 *         in: query
 *         schema:
 *           type: integer
 *           format: int32
 *           default: 100
 *       - name: pageIndex
 *         in: query
 *         schema:
 *           type: integer
 *           format: int32
 *           default: 0
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Invalid Slug
 */
router.get("/slug/:slug", getTeamBySlug);

export default router;
