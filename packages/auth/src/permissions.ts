import type { AbilityBuilder } from "@casl/ability"
import type { AppAbility } from "."
import type { User } from "./models/user"
import type { Role } from "./roles"

type PermissionByRole = (user:User, builder: AbilityBuilder<AppAbility>) => void

export const permissions: Record<Role, PermissionByRole> = {
  ADMIN(user, { can, cannot }) {
    can('manage', 'all')

    cannot(['transfer_ownership', 'update'], 'Organization') //nao pode transferir e atualizar uma organizacao que nao e dona
    can(['transfer_ownership', 'update'], 'Organization', { ownerId: { $eq: user.id } }) //pode transferir e atualizar uma organizacao que e dona
  },
  MEMBER(user, { can }) {
    can('get', 'User') //pode ver qualquer usuario
    can(['create', 'get'], 'Project') //pode criar e ver qualquer projeto
    can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } }) //pode atualizar e deletar um projeto que e dono
  },
  BILLING(_, { can }) {
    can('manage', 'Billing') //pode gerenciar o billing
  }
}