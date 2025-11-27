import { Ship } from "@/api/ship/types.ts";

export type PlanetVisit = {
  id: string;
  uid: string;
  planetId: string;
  mined: Record<string, any>;
  exhausted: boolean;
  timestamp: string;
};

export type Balance = {
  id: string;
  uid: string;
  currencyId: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  gameDataId: string;
};

export type InventoryItem = {};

export type GameDataResponse = {
  id: string;
  uid: string;
  shipId: string;
  currentPlanetId: string;
  x: number;
  y: number;
  z: number;
  planetVisits: PlanetVisit[];
  balances: Balance[];
  ships: Ship[];
  inventoryItems: InventoryItem[];
};
