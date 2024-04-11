import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { monsters } from "./data";
import {
  ApiError,
  Monster,
  MonsterWithHealth,
  monsterTypeSchema,
} from "./types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Monster> | ApiError>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      error: { message: `Method ${req.method} Not Allowed` },
    });
    return;
  }
  const schema = z.object({
    type: monsterTypeSchema.optional(),
  });

  const response = schema.safeParse(req.query);

  if (!response.success) {
    const { errors } = response.error;
    res.status(400).json({ error: { message: "Invalid request", errors } });
    return;
  }

  const { type } = response.data;

  const filteredMonsters = type
    ? monsters.filter((monster) => monster.type === type)
    : monsters;

  const monstersWithHealth: Array<MonsterWithHealth> = filteredMonsters.map(
    (monster) => ({ ...monster, health: 100 })
  );

  res.status(200).json(monstersWithHealth);
}
