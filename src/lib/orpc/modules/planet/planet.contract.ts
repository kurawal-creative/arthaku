import z from "zod";
import { pub, authed } from "../../os"; // changed to standard

export const PlanetSchema = z.object({  
  id: z.number().int().min(1),  
  name: z.string(),  
});

export const listPlanetsContract = authed  
  .route({ method: 'GET', path: '/planets' })  
  .input(z.object({ limit: z.number().int().default(10) }))  
  .output(z.array(PlanetSchema));

export const planetContract = {
  list: listPlanetsContract,
};