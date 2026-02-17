'use server'

import { revalidateTag } from 'next/cache'

import { acceptInvite } from '@/src/http/accept-invite'
import { rejectInvite } from '@/src/http/reject-invite'

export async function acceptInviteAction(inviteId: string) {
  await acceptInvite(inviteId)

  revalidateTag('organizations', 'default')
}

export async function rejectInviteAction(inviteId: string) {
  await rejectInvite(inviteId)
}
