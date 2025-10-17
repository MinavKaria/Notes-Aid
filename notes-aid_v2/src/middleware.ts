import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware() {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect admin routes
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return !!token?.isAdmin
        }
        // Protect curriculum page (admin only)
        if (req.nextUrl.pathname.startsWith("/curriculum")) {
          return !!token?.isAdmin
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/curriculum"]
}