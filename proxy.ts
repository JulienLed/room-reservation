import { auth } from "@/lib/auth";

export const proxy = auth((req) => {
  //Si pas de session ET si la prochaine URL n'est pas "/login"
  if (
    !req.auth &&
    req.nextUrl.pathname !== "/" &&
    req.nextUrl.pathname !== "/sign-in"
  ) {
    //On construit l'url vers laquelle le user sera redirigée
    const newUrl = new URL("/", req.nextUrl.origin);

    //On redirige le user vers la nouvelle url créée
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
