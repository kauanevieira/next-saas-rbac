import { defineAbilityFor, projectsSchema } from '@saas/auth'

const ability = defineAbilityFor({ role: 'MEMBER', id: 'user-1' })

const project = projectsSchema.parse({
  __typename: 'Project',
  id: 'project-1',
  name: 'Project 1',
  ownerId: 'user-1'
})

console.log(ability.can('get', 'Billing'))
