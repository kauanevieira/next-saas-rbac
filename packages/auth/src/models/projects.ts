import z from "zod"

export const projectsSchema = z.object({
  __typename: z.literal('Project').default('Project'),
  id: z.string(),
  ownerId: z.string(),
})

export type Projects = z.infer<typeof projectsSchema>