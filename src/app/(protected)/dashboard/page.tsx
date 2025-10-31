import { SubscriptionEntitlementQuery } from '@/convex/query.config'
import { combinedSlug } from '@/lib/utils'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {

  const {entitlement, profileName} = await SubscriptionEntitlementQuery()

  if(!entitlement._valueJSON){
    redirect(`/dashboard/${combinedSlug(profileName!)}`)
  }
   redirect(`/dashboard/${combinedSlug(profileName!)}`)
  // return (
  //   <div>page</div>
  // )
}

export default page