import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      provider?: string
      isAdmin?: boolean
      githubUsername?: string
      isSuperAdmin?: boolean
      allowedSubjects?: string[]
    } & DefaultSession["user"]
  }

  interface Profile {
    login?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string
    isAdmin?: boolean
    githubUsername?: string
    isSuperAdmin?: boolean
    allowedSubjects?: string[]
  }
}