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
