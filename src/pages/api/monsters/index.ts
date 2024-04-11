import type { NextApiRequest, NextApiResponse } from "next";
import { monsters } from "./data";
import { ApiError, Monster, MonsterWithHealth } from "./types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Monster> | ApiError>
) {
  const {
    query: { type },
    method,
  } = req;

  if (method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      error: { message: `Method ${method} Not Allowed` },
    });
    return;
  }

  const filteredMonsters = type
    ? monsters.filter((monster) => monster.type === type)
    : monsters;

  const monstersWithHealth: Array<MonsterWithHealth> = filteredMonsters.map(
    (monster) => ({ ...monster, health: 100 })
  );

  res.status(200).json(monstersWithHealth);
}
