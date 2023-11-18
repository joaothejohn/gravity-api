import { Request, Response } from "express";
import { authorizeUser } from "../adapters/auth";

export async function authenticateGet(req: Request, res: Response) {
  const { username, calledStationId } = req.params;
  const { action } = req.query;

  if (action === 'authorize') {
    try {
      const response = await authorizeUser(username, calledStationId);
      console.log('response', response)
      return res.status(200).json(response);
    } catch (error) {
      return res.status(401).send('Unauthorized');
    }
  }

  return res.status(401).send('Unauthorized');
}