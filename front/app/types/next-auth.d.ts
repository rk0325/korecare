import NextAuth from 'next-auth';

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      id?: string;
      name?: string;
      image?: string;
    }
  }

  interface User {
    id?: string;
  }
}
