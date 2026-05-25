import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isEducatorRoute = createRouteMatcher(["/educator(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();

  if (isEducatorRoute(req)) {
    const role = sessionClaims?.metadata?.role;

    const isAllowed = role === "educator" || role === "admin";

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/?error=unauthorized", req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/", "/(api|trpc)(.*)"],
};
