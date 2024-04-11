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
  error: { message: string };
};
