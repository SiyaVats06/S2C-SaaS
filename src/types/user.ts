import { combinedSlug } from "@/lib/utils"

export type ConvexUserRaw = {
  _creationTime: number
  _id: string
  email: string
  emailVerificationTime?: number
  image?: string
  name?: string
}

export type Profile = {
  id: string // normalized from _id
  createdAtMs: number // from _creationTime
  email: string
  emailVerifiedAtMs?: number // from emailVerificationTime
  image?: string
  name?: string
}

export const normalizeProfile = (
  raw: ConvexUserRaw | null
): Profile | null => {
  if (!raw) return null

  const extractNameFromEmail = (email: string): string => {
    const username = email.split('@')[0]
    return username
      .split(/[-_.]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ')
  }

  //TO DO: Send name into the convex DB during SignUP and send in combinedSlug(raw.name!)
  
  // const name = combinedSlug(raw.name!) || extractNameFromEmail(raw.email)

  const name = raw?.name? combinedSlug(raw.name!) : extractNameFromEmail(raw.email)

  // const combinedSlugName = combinedSlug(raw.name!)
  // const name = combinedSlugName==='untitled'? extractNameFromEmail(raw.email): combinedSlugName

  console.log("name", name);
  
  return {
    id: raw._id,
    createdAtMs: raw._creationTime,
    email: raw.email,
    emailVerifiedAtMs: raw.emailVerificationTime,
    image: raw.image,
    name
  }
}

