import { z } from "zod";
import { MonsterWithHealth, monstersWithHealthSchema } from "../monsters/types";

export type Fight = {
  dragon1: MonsterWithHealth;
  dragon2: MonsterWithHealth;
};

export type FightWinner = null | "dragon1" | "dragon2" | "none";

export type FightResult = Fight & {
  winner: FightWinner;
};

export const fightSchema = z.object({
  dragon1: monstersWithHealthSchema,
  dragon2: monstersWithHealthSchema,
});
