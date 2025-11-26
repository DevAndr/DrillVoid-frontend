import { MetaDataTIme, Rarity } from "@/api/common/types.ts";

export type Point3D = {
  x: number;
  y: number;
  z: number;
};

export interface ScanOptions {
  count: number; // сколько планет сгенерировать
  radius: number; // радиус поиска
}

export type PayloadScanPlanets = {
  uid: string;
  point: Point3D;
  options: ScanOptions;
};

export enum PlanetType {
  ROCKY = "ROCKY",
  LUSH = "LUSH",
  FROZEN = "FROZEN",
  TOXIC = "TOXIC",
  EXOTIC = "EXOTIC",
  BLACKHOLE = "BLACKHOLE",
}

export enum ResourceType {
  COPPER = "COPPER",
  CARBON = "CARBON",
  SILICON = "SILICON",
  ALUMINUM = "ALUMINUM",
  TITANIUM = "TITANIUM",
  NICKEL = "NICKEL",
  COBALT = "COBALT",
  URANIUM = "URANIUM",
  ALPHACREDITS = "ALPHACREDITS",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
  IRIDIUM = "IRIDIUM",
  EXOTICMATTER = "EXOTICMATTER",
  GAMMARSHARDS = "GAMMARSHARDS",
  MAGNESIUM = "MAGNESIUM",
  CALCIUM = "CALCIUM",
  OBSIDIAN = "OBSIDIAN",
  COAL = "COAL",
  MANGANESE = "MANGANESE",
  CHROMIUM = "CHROMIUM",
  ZINC = "ZINC",
  TUNGSTEN = "TUNGSTEN",
  MOLYBDENUM = "MOLYBDENUM",
  RHODIUM = "RHODIUM",
  PALLADIUM = "PALLADIUM",
  OSMIUM = "OSMIUM",
  RUTHENIUM = "RUTHENIUM",
  HELIUM3 = "HELIUM3",
  TRITIUM = "TRITIUM",
  DEUTERIUM = "DEUTERIUM",
  LITHIUM = "LITHIUM",
  BORON = "BORON",
  PHOSPHORUS = "PHOSPHORUS",
  SULFUR = "SULFUR",
  WATERICE = "WATERICE",
  AMMONIA = "AMMONIA",
  METHANE = "METHANE",
  BETATOKENS = "BETATOKENS",
  NAQUADA = "NAQUADA",
  UNOBTANIUM = "UNOBTANIUM",
  KYRIPTONITE = "KYRIPTONITE",
  DILITHIUM = "DILITHIUM",
  TRILLIUM = "TRILLIUM",
  VERYNIUM = "VERYNIUM",
  ADRA = "ADRA",
  STRYDIUM = "STRYDIUM",
  NEUTRONIUM = "NEUTRONIUM",
  QUANTUMORE = "QUANTUMORE",
}

export type ResourcePlanet = {
  type: ResourceType;
  rarity: Rarity;
  totalAmount: number;
  remainingAmount: number;
};

export type Planet = {
  name: string;
  biome: PlanetType;
  rarity: Rarity;
  resources: ResourcePlanet[];
  seed: string;
  position: Point3D;
};

export type PlanetDetails = Planet & {
  isCreated: boolean;
};

export type TotalMiningPlanet = {
  totalTimeMining: string;
};

export type PayloadTotalTimeMiningPlanet = {
  uid: string;
  seed: string;
};

export type PlanetPrisma = {
  id: string;
  seed: string;
  name: string;
  type: PlanetType;
  ownerBy: string;
  x: number;
  y: number;
  z: number;
  rarity: Rarity;
  depleted: boolean;
  resources: PlanetPrismaResource[];
};

export type PlanetPrismaResource = {
  id: string;
  planetId: string;
  type: ResourceType;
  totalAmount: number;
  current: number;
  drillPowerRequired: number;
  rarity: Rarity;
} & MetaDataTIme;

export type JumpResponseData = {
  planet: Planet;
  message: string;
  distance: number;
  fuelUsed: number;
};
