import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAuthPage = (req: Request) => {
  const url = new URL(req.url);

  return (
    url.pathname === "/sign-in" ||
    url.pathname.startsWith("/sign-in/") ||
    url.pathname === "/sign-up" ||
    url.pathname.startsWith("/sign-up/")
  );
};

const isProtectedRoute = (req: Request) => {
  const url = new URL(req.url);

  return url.pathname === "/" || url.pathname.startsWith("/dashboard");
};

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // User is already logged in
  // Don't allow them to visit sign-in/sign-up
  if (userId && isAuthPage(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // User is NOT logged in
  // Protect private routes
  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
