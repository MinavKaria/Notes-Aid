import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import type { JWT } from 'next-auth/jwt';
import type { Session, User, Account, Profile } from 'next-auth';
import type { AdapterUser } from 'next-auth/adapters';

// Array of allowed admin GitHub usernames
const ADMIN_USERNAMES = ['minavkaria','yashankkothari'];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user, account, profile }: {
      token: JWT;
      user?: User | AdapterUser;
      account?: Account | null;
      profile?: Profile;
    }) {
      if (user && account) {
        token.provider = account.provider;

        if (account.provider === 'github') {
          const githubUsername = (profile as { login?: string })?.login;
          token.githubUsername = githubUsername;
          // Only allow admin access if username is in the allowed list
          const isAuthorizedAdmin = ADMIN_USERNAMES.includes(githubUsername?.toLowerCase() || '');
          token.isAdmin = isAuthorizedAdmin;
          token.isSuperAdmin = isAuthorizedAdmin; // Set isSuperAdmin for authorized admins
        } else {
          token.isAdmin = false;
          token.isSuperAdmin = false;
        }
      }
      return token;
    },
    async session({ session, token }: {
      session: Session;
      token: JWT;
    }) {
      session.user.id = token.sub;
      session.user.provider = token.provider as string;
      session.user.isAdmin = token.isAdmin as boolean;
      session.user.isSuperAdmin = token.isSuperAdmin as boolean;
      if (token.githubUsername) {
        session.user.githubUsername = token.githubUsername as string;
      }
      return session;
    },
    async signIn({ account, profile }: {
      user: User | AdapterUser;
      account?: Account | null;
      profile?: Profile;
    }) {
      // If signing in with GitHub, check if user is in allowed admin list
      if (account?.provider === 'github') {
        const githubUsername = (profile as { login?: string })?.login;
        if (!ADMIN_USERNAMES.includes(githubUsername?.toLowerCase() || '')) {
          // Deny access for GitHub users not in admin list
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
