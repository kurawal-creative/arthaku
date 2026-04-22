import { os, ORPCError } from '@orpc/server'  
import * as z from 'zod'  
  
const PlanetSchema = z.object({  
  id: z.number().int().min(1),  
  name: z.string(),  
})  
  
export const listPlanets = os  
  .route({ method: 'GET', path: '/planets' })  
  .input(z.object({ limit: z.number().int().default(10) }))  
  .output(z.array(PlanetSchema))  
  .handler(async ({ input }) => {  
    return [{ id: 1, name: 'Earth' }]  
  })  
  
export const router = {  
  planet: { list: listPlanets },  
}