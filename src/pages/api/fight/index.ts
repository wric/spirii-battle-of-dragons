import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "../monsters/types";
import { attack, evaluateWinner } from "./lib";
import { Fight, FightResult } from "./types";

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
