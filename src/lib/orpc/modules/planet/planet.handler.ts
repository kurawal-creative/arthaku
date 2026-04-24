import { listPlanetsContract } from "./planet.contract";

export const listPlanets = listPlanetsContract.handler(async ({ input }) => {
  return [{ id: 1, name: "Earth" }];
});
