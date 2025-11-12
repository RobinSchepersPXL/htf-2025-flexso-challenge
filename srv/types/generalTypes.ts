import { __Integer, __UUID } from "@sap/cds";

export type material = {
  ID: __UUID;
  name?: String; //The name of the product
  weight?: String;
  dimensions?: String;
  color?: String;
  amountInStock?: number;
  amountOrderd?: number;
  amountNeededForProduction?: number;
  product?: __UUID;
};

export type production = {
  ID: __UUID;
  icon: String;
  label: String;
  position: number;
};

export type state = {
  ID: __UUID;
  state: String;
  value: number;
  production: __UUID;
};
