import proxy from "next-auth/middleware"

export default proxy;

export const config = {
  // Protect these routes, but leave /login, /register, and / public
  matcher: ["/user/:path*", "/lister/:path*", "/admin/:path*"]
}
