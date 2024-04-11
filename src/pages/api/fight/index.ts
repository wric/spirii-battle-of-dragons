import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "../monsters/types";
import { attack, evaluateWinner } from "./lib";
import { Fight, FightResult, fightSchema } from "./types";
import { z } from "zod";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FightResult | ApiError>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ error: { message: `Method ${req.method} Not Allowed` } });
    return;
  }

  let body = {};
  try {
    body = JSON.parse(req.body);
  } catch (err) {
    res.status(400).json({ error: { message: 'Failed to parse body' } });
    return;
  }

  const schema = fightSchema;
  const response = schema.safeParse(body);

  if (!response.success) {
    const { errors } = response.error;
    console.log(response.error);
    res.status(400).json({ error: { message: "Invalid request", errors } });
    return;
  }

  const { dragon1, dragon2 } = response.data;

  const result: FightResult = {
    dragon1: { ...dragon1, health: attack(dragon2, dragon1) },
    dragon2: { ...dragon2, health: attack(dragon1, dragon2) },
    winner: null,
  };

  const resultWithMaybeWinner = evaluateWinner(result);
  fightLog.push({ fight: { dragon1, dragon2 }, result: resultWithMaybeWinner });

  res.status(201).json(resultWithMaybeWinner);
}

const fightLog = [];
