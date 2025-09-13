import { defineAbilityFor } from '@saas/auth'

const ability = defineAbilityFor({ role: 'ADMIN' })

const usetCanIviteSomeoneElse = ability.can('manage', 'User')
const userCanDeleteOtherUsers = ability.can('delete', 'User')

const userCannotDeleteOtherUsers = ability.cannot('delete', 'User')

console.log({ usetCanIviteSomeoneElse });
console.log({ userCanDeleteOtherUsers });
console.log({ userCannotDeleteOtherUsers });
