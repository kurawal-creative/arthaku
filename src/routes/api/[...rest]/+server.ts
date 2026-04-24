import { OpenAPIHandler } from '@orpc/openapi/fetch'  
import { onError } from '@orpc/server'  
import type { RequestHandler } from '@sveltejs/kit'  
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4'  
import { SmartCoercionPlugin } from '@orpc/json-schema'  
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins'  
import { router } from '$lib/orpc'  
import { auth } from '$lib/auth'
  
const handler = new OpenAPIHandler(router, {  
  interceptors: [  
    onError((error) => console.error(error)),  
  ],  
  plugins: [  
    new SmartCoercionPlugin({  
      schemaConverters: [new ZodToJsonSchemaConverter()],  
    }),  
    new OpenAPIReferencePlugin({  
      schemaConverters: [new ZodToJsonSchemaConverter()],  
      specGenerateOptions: {  
        info: { title: 'My API', version: '1.0.0' },  
      },  
    }),  
  ],  
})  
  
const handle: RequestHandler = async ({ request }) => {  
    const session = await auth.api.getSession({  
    headers: request.headers,  
  })  
  
  const { response } = await handler.handle(request, {  
    prefix: '/api',  
    context: {  
      user: session?.user,  
      session: session?.session,  
      headers: request.headers,  
    },  
  })  
  return response ?? new Response('Not Found', { status: 404 })  
}  
  
export const GET = handle  
export const POST = handle  
export const PUT = handle  
export const PATCH = handle  
export const DELETE = handle