import { OpenAPIHandler } from '@orpc/openapi/fetch'  
import { onError } from '@orpc/server'  
import type { RequestHandler } from '@sveltejs/kit'  
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4'  
import { SmartCoercionPlugin } from '@orpc/json-schema'  
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins'  
import { router } from '$lib/router'  
  
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
  const { response } = await handler.handle(request, {  
    prefix: '/api',  
    context: {},  
  })  
  return response ?? new Response('Not Found', { status: 404 })  
}  
  
export const GET = handle  
export const POST = handle  
export const PUT = handle  
export const PATCH = handle  
export const DELETE = handle