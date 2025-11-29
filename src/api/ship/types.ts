export enum TypeShip {
  STARTER = "STARTER",
  CARGO = "CARGO",
  BIG_CARGO = "BIG_CARGO",
}

export type Ship = {
  id: string;
  uid: string;
  level: number;
  type: TypeShip;
  warpRange: number;
  warpSpeed: number;
  miningPower: number;
  cargoSize: number;
  locator: number;
  fuel: number;
  fuelCapacity: number;
  fuelPerUnit: number;
  createdAt: string;
  updatedAt: string;
  isSelected: boolean;
  gameDataId: string;
};

export enum MiningSessionStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
  CANCELLED = "CANCELLED",
}

export type MiningSession = {
  id: string;
  uid: string;
  resourceId: string;
  planetId: string;
  planetSeed: string;
  startedAt: string;
  status: MiningSessionStatus;
  lastClaimAt: string;
  maxAmount: number;
  mined: number;
  estimatedAmount: number;
  miningRate: number;
  finishedAt: string;
};

export type StartMiningResponse = {
  miningRate: number;
  amountToMine: number;
  timeMinutes: number;
  timeMs: number;
  session: MiningSession;
};

export type MiningResponse = {
  id: string;
  uid: string;
  resourceId: string;
  planetId: string;
  planetSeed: string;
  startedAt: string; // ISO date string
  status: MiningSessionStatus;
  lastClaimAt: string; // ISO date string
  maxAmount: number;
  mined: number;
  estimatedAmount: number;
  miningRate: number;
  finishedAt: string; // ISO date string
  remainingToMine: number;
  elapsedMs: number;
  remainingMs: number;
  totalMs: number;
  progressPercent: number;
};
