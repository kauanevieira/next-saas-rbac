import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { createAccount } from './routes/auth/create-account'
import { authenticateWithPassword } from './routes/auth/authenticate-with-password'
import { getProfile } from './routes/auth/get-profile'
import { errorHandler } from './error-handler'
import { requestPasswordRecover } from './routes/auth/request-password-recover'
import { resetPassword } from './routes/auth/reset-password'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler) // validacao de resposta e saida das rotas
app.setValidatorCompiler(validatorCompiler) // validacao de entrada das rotas

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS',
      description: 'Full-stack SaaS with multi-tenant & RBAC.',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: 'my-jwt-secret',
})

app.register(fastifyCors)

// http POST :3333/users name=Kauane email=kauane@acme.com password=123456
app.register(createAccount)

// http POST :3333/sessions/password email=kauane@acme.com password=123456
app.register(authenticateWithPassword)

// http GET :3333/profile Authorization='Bearer <token>'
// Decodificar o token e pegar o sub (id do user) no jwt.io
app.register(getProfile)

// http POST :3333/password/recover email=kauane@acme.com
app.register(requestPasswordRecover)

app.register(resetPassword)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})
