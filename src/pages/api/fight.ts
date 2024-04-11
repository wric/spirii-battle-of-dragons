import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError, MonsterWithHealth } from "./monsters";

export type Fight = {
  dragon1: MonsterWithHealth;
  dragon2: MonsterWithHealth;
};

export type FightWinner = null | "dragon1" | "dragon2" | "none";

export type FightResult = Fight & {
  winner: FightWinner;
};

const attack = (
  attacker: MonsterWithHealth,
  victim: MonsterWithHealth
): number =>
  Math.max(Math.round(victim.health - attacker.strength * Math.random()), 0);

const evaluateWinner = (fightResult: FightResult): FightResult => {
  if (fightResult.dragon1.health === 0 && fightResult.dragon2.health === 0) {
    fightResult.winner = "none";
  } else if (fightResult.dragon1.health === 0) {
    fightResult.winner = "dragon2";
  } else if (fightResult.dragon2.health === 0) {
    fightResult.winner = "dragon1";
  }

  return fightResult;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FightResult | ApiError>
) {
  const { method, body } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ error: { message: `Method ${method} Not Allowed` } });
    return;
  }

  let fight: Fight;
  try {
    fight = JSON.parse(body) as Fight;
  } catch (err) {
    res.status(400).json({ error: { message: `Failed to parse body` } });
    return;
  }

  const result: FightResult = {
    dragon1: { ...fight.dragon1, health: attack(fight.dragon2, fight.dragon1) },
    dragon2: { ...fight.dragon2, health: attack(fight.dragon1, fight.dragon2) },
    winner: null,
  };

  const resultWithMaybeWinner = evaluateWinner(result);
  fightLog.push({ fight, result: resultWithMaybeWinner });

  res.status(201).json(resultWithMaybeWinner);
}

const fightLog = [];
