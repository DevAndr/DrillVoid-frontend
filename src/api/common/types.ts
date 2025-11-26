export enum Rarity {
  COMMON = "COMMON",
  UNCOMMON = "UNCOMMON",
  RARE = "RARE",
  EPIC = "EPIC",
  LEGENDARY = "LEGENDARY",
}

type Meta = {
  timestamp: string;
  requestId: string;
};

export type ResponseServer<T> = {
  success: boolean;
  error: string;
  message: string;
  statusCode: number;
  meta: Meta;
  data: T;
};

export type MetaDataTIme = {
  createdAt: Date;
  updatedAt: Date;
};
