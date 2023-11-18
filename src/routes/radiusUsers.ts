import express from "express";
import {
  getAllRadiusUsers,
  createRadiusUser,
  deleteRadiusUser,
  getRadiusUserById,
  getRadiusUsers,
} from "../controllers/radiusUsers";

const router = express.Router();

/**
 * @openapi
 * /radiususers:
 *   get:
 *     tags:
 *       - RadiusUsers
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
router.get("/", getAllRadiusUsers);

/**
 * @openapi
 * /radiususers/{domainId}:
 *   get:
 *     tags:
 *       - RadiusUsers
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
 */
router.get("/:domainId", getRadiusUsers);

/**
 * @openapi
 * /radiususers/{domainId}/{userId}:
 *   get:
 *     tags:
 *       - RadiusUsers
 *     parameters:
 *       - name: domainId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: User not found
 */
router.get("/:domainId/:userId", getRadiusUserById);

/**
 * @openapi
 * /radiususers/{domainId}:
 *   post:
 *     tags:
 *       - RadiusUsers
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
 *             $ref: '#/components/schemas/NewUserRadius'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Username or Password invalid or DomainId invalid
 *       500:
 *         description: Server error
 */
router.post("/:domainId", createRadiusUser);

/**
 * @openapi
 * /radiususers/{domainId}/{userId}:
 *   delete:
 *     tags:
 *       - RadiusUsers
 *     parameters:
 *       - name: domainId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User removed
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete("/:domainId/:userId", deleteRadiusUser);

export default router;
