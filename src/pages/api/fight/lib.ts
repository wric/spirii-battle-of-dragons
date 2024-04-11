import { MonsterWithHealth } from "../monsters/types";
import { FightResult } from "./types";

export const attack = (
  attacker: MonsterWithHealth,
  victim: MonsterWithHealth
): number =>
  Math.max(Math.round(victim.health - attacker.strength * Math.random()), 0);

export const evaluateWinner = (fightResult: FightResult): FightResult => {
  if (fightResult.dragon1.health === 0 && fightResult.dragon2.health === 0) {
    fightResult.winner = "none";
  } else if (fightResult.dragon1.health === 0) {
    fightResult.winner = "dragon2";
  } else if (fightResult.dragon2.health === 0) {
    fightResult.winner = "dragon1";
  }

  return fightResult;
};
