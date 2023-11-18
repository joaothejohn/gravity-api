import express from "express";

import {
  getAllPlans,
  getDomainPlans,
  getPlanById,
  createPlan,
  deletePlanById,
} from "../controllers/plans";

const router = express.Router();

/**
 * @openapi
 * /plans:
 *   get:
 *     tags:
 *       - Plans
 *     parameters:
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
 */
router.get("/", getAllPlans);

/**
 * @openapi
 * /plans/{domainId}:
 *   get:
 *     tags:
 *       - Plans
 *     parameters:
 *       - name: domainId
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
 *         description: Invalid DomainId
 */
router.get("/:domainId", getDomainPlans);

/**
 * @openapi
 * /plans/{domainId}/{planId}:
 *   get:
 *     tags:
 *       - Plans
 *     parameters:
 *       - name: domainId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: planId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Plan not found
 */
router.get("/:domainId/:planId", getPlanById);

/**
 * @openapi
 * /plans/{domainId}:
 *   post:
 *     tags:
 *       - Plans
 *     parameters:
 *       - name: domainId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUserPlan'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Missing domainId or Name is required or DomainId invalid
 *       500:
 *         description: Server error
 */
router.post("/:domainId", createPlan);

/**
 * @openapi
 * /plans/{domainId}/{planId}:
 *   delete:
 *     tags:
 *       - Plans
 *     parameters:
 *       - name: domainId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: planId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Plan removed
 *       404:
 *         description: Plan not found
 *       500:
 *         description: Server error
 */
router.delete("/:domainId/:planId", deletePlanById);

export default router;
