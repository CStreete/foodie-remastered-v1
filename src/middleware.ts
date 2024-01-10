import NextAuth from "next-auth";
import { auth, authConfig } from "./auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuth,
  apiUploadImage,
  authRoutes,
  foodieAi,
  publicRoutes,
} from "../routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuth);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiUploadRoute = nextUrl.pathname.startsWith(apiUploadImage);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute && !isApiUploadRoute && !foodieAi) {
    return Response.redirect(new URL("/", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
