import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith('/home');
      const isOnSeed = nextUrl.pathname.startsWith('/seed');
      const isOnUploads = nextUrl.pathname.startsWith('/uploads');

      if (isOnUploads) return isLoggedIn;
      if (isOnSeed) return true;

      if (isOnHome) {
        return isLoggedIn;
      // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/home', nextUrl));
      }

      return false;
    },
  },
} satisfies NextAuthConfig;
