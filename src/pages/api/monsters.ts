import type { NextApiRequest, NextApiResponse } from "next";

type MonterType = "aberration" | "humanoid" | "dragon";

type Monster = {
  id: number;
  name: string;
  size: "Large" | "Medium" | "Huge";
  type: MonterType;
  strength: number;
};

export type MonsterWithHealth = Monster & { health: number };

export type ApiError = {
  error: { message: string };
};

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

  const filteredMonsters =
    type !== ""
      ? monsters.filter((monster) => monster.type === type)
      : monsters;

  const monstersWithHealth: Array<MonsterWithHealth> = filteredMonsters.map(
    (monster) => ({ ...monster, health: 100 })
  );

  res.status(200).json(monstersWithHealth);
}

export const monsters: Array<Monster> = [
  {
    id: 0,
    name: "Aboleth",
    size: "Large",
    type: "aberration",
    strength: 21,
  },
  {
    id: 1,
    name: "Acolyte",
    size: "Medium",
    type: "humanoid",
    strength: 10,
  },
  {
    id: 2,
    name: "Adult Black Dragon",
    size: "Huge",
    type: "dragon",
    strength: 23,
  },
  {
    id: 3,
    name: "Adult Blue Dragon",
    size: "Huge",
    type: "dragon",
    strength: 25,
  },
  {
    id: 4,
    name: "Adult Brass Dragon",
    size: "Huge",
    type: "dragon",
    strength: 23,
  },
  {
    id: 5,
    name: "Adult Bronze Dragon",
    size: "Huge",
    type: "dragon",
    strength: 25,
  },
  {
    id: 6,
    name: "Adult Copper Dragon",
    size: "Huge",
    type: "dragon",
    strength: 23,
  },
  {
    id: 7,
    name: "Adult Gold Dragon",
    size: "Huge",
    type: "dragon",
    strength: 27,
  },
  {
    id: 8,
    name: "Adult Green Dragon",
    size: "Huge",
    type: "dragon",
    strength: 23,
  },
  {
    id: 9,
    name: "Adult Red Dragon",
    size: "Huge",
    type: "dragon",
    strength: 27,
  },
  {
    id: 10,
    name: "Adult Silver Dragon",
    size: "Huge",
    type: "dragon",
    strength: 27,
  },
  {
    id: 11,
    name: "Adult White Dragon",
    size: "Huge",
    type: "dragon",
    strength: 22,
  },
];
