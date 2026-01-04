import { preloadQuery } from "convex/nextjs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "../../convex/_generated/api";
import { ConvexUserRaw, normalizeProfile } from "@/types/user";
import { Id } from "../../convex/_generated/dataModel";

export const ProfileQuery = async () => {
  return await preloadQuery(
    api.user.getCurrentUser,
    {},
    { token: await convexAuthNextjsToken() }
  );
};

export const SubscriptionEntitlementQuery = async () => {
  const rawProfile = await ProfileQuery();

  // as unknown as ConvexUserRaw
  // First cast to unknown → “forget what this value’s type is
  // Then cast from unknown to your target type (ConvexUserRaw)

  const profile = normalizeProfile(
    rawProfile._valueJSON as unknown as ConvexUserRaw | null
  );
         
  const entitlement = await preloadQuery(
    api.subscription.hasEntitlement,
    { userId: profile?.id as Id<"users"> },
    { token: await convexAuthNextjsToken() }
  );

  return { entitlement, profileName: profile?.name };
};
