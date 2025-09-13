import type { AbilityBuilder } from "@casl/ability"
import type { AppAbility } from "."
import type { User } from "./models/user"
import type { Role } from "./roles"

type PermissionByRole = (user:User, builder: AbilityBuilder<AppAbility>) => void

export const permissions: Record<Role, PermissionByRole> = {
  ADMIN(_, { can }) {
    can('manage', 'all')
  },
  MEMBER(user, { can }) {
    // can('invite', 'User')
    can([ 'create', 'get' ], 'Project')
    can('get', 'Project', { ownerId: user.id })
    can('create', 'Organization', { ownerId: user.id })
  },
  BILLING(_, { can }) {
    can('get', 'Project')
  }
}