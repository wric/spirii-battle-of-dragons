import { z } from "zod";

export type MonterType = "aberration" | "humanoid" | "dragon";

export type Monster = {
  id: number;
  name: string;
  size: "Large" | "Medium" | "Huge";
  type: MonterType;
  strength: number;
};

export type MonsterWithHealth = Monster & { health: number };

export type ApiError = {
  error: { message: string; errors?: any };
};

export const monsterTypeSchema = z.union([
  z.literal("aberration"),
  z.literal("humanoid"),
  z.literal("dragon"),
]);

export const monstersWithHealthSchema = z.object({
  id: z.number(),
  name: z.string(),
  size: z.union([z.literal("Large"), z.literal("Medium"), z.literal("Huge")]),
  type: monsterTypeSchema,
  strength: z.number(),
  health: z.number(),
});
