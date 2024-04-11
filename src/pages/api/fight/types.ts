import { MonsterWithHealth } from "../monsters/types";

export type Fight = {
  dragon1: MonsterWithHealth;
  dragon2: MonsterWithHealth;
};

export type FightWinner = null | "dragon1" | "dragon2" | "none";

export type FightResult = Fight & {
  winner: FightWinner;
};
