export { default } from "next-auth/middleware"

export const config = {
  // Protect these routes, but leave /login, /register, and / public
  matcher: ["/user/:path*", "/lister/:path*", "/admin/:path*"]
}
