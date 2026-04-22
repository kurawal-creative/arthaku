import type { JsonifiedClient } from '@orpc/openapi-client'  
import type { ContractRouterClient } from '@orpc/contract'  
import { OpenAPILink } from '@orpc/openapi-client/fetch'  
import { createORPCClient } from '@orpc/client'  
import { router } from './router'  
  
declare global {  
  var $client: JsonifiedClient<ContractRouterClient<typeof router>> | undefined  
}  
  
const link = new OpenAPILink(router, {  
  url: () => {  
    if (typeof window === 'undefined') {  
      throw new Error('OpenAPILink is not allowed on the server side.')  
    }  
    return `${window.location.origin}/api`  
  },  
})  
  
export const client: JsonifiedClient<ContractRouterClient<typeof router>> =  
  globalThis.$client ?? createORPCClient(link)
