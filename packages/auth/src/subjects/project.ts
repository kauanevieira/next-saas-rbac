import { z } from "zod"
import { projectsSchema } from "../models/projects"

export const projectSubject = z.tuple([
  z.union([
    z.literal('create'), 
    z.literal('get'), 
    z.literal('update'),
    z.literal('delete'),
    z.literal('manage')
  ]),
  z.union([
    z.literal('Project'),
    projectsSchema
  ])
])

export type ProjectSubject = z.infer<typeof projectSubject>