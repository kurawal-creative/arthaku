import z from "zod"
import { authed } from "./orpc-builder"

const PlanetSchema = z.object({  
  id: z.number().int().min(1),  
  name: z.string(),  
})  
  
export const listPlanets = authed  
  .route({ method: 'GET', path: '/planets' })  
  .input(z.object({ limit: z.number().int().default(10) }))  
  .output(z.array(PlanetSchema))  
  .handler(async ({ input }) => {  
    return [{ id: 1, name: 'Earth' }]  
  })  
  