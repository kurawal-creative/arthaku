import { OpenAPILink } from '@orpc/openapi-client/fetch'  
import { createORPCClient } from '@orpc/client'  
import type { JsonifiedClient } from '@orpc/openapi-client'  
import type { ContractRouterClient } from '@orpc/contract'  
import { router } from './router'  
  
const link = new OpenAPILink(router, {  
  url: `${window.location.origin}/api`,  
})  
  
export const client: JsonifiedClient<ContractRouterClient<typeof router>> = createORPCClient(link)
