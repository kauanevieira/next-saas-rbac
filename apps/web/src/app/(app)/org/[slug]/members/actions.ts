'use server'

import { Role } from '@saas/auth'
import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/src/auth/auth'
import { removeMember } from '@/src/http/remove-member'
import { updateMember } from '@/src/http/update-member'

export async function removeMemberAction(memberId: string) {
  const currentOrg = await getCurrentOrg()

  await removeMember({
    org: currentOrg!,
    memberId,
  })

  revalidateTag(`${currentOrg}/members`, 'default')
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = await getCurrentOrg()

  await updateMember({
    org: currentOrg!,
    memberId,
    role,
  })

  revalidateTag(`${currentOrg}/members`, 'default')
}
