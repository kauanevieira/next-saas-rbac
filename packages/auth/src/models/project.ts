import { z } from 'zod'

export const projectSchema = z.object({
  __typename: z.literal('Project').default('Project'), // É necessário para o CASL identificar o tipo do sujeito
  id: z.string(),
  ownerId: z.string(),
})

export type Project = z.infer<typeof projectSchema>
