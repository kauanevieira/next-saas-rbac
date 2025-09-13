import { ability } from '@saas/auth'

const usetCanIviteSomeoneElse = ability.can('invite', 'User')
const userCanDeleteOtherUsers = ability.can('delete', 'User')

const userCannotDeleteOtherUsers = ability.cannot('delete', 'User')

console.log({ usetCanIviteSomeoneElse });
console.log({ userCanDeleteOtherUsers });
console.log({ userCannotDeleteOtherUsers });
