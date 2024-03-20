import NextAuth from 'next-auth';
import LineProvider from 'next-auth/providers/line';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const handler = NextAuth({
  providers: [
    LineProvider({
      id: "line",
      name: "LINE",
      clientId: process.env.NEXT_PUBLIC_LINE_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_LINE_CLIENT_SECRET || '',
      authorization: { params: { scope: "profile openid" } },
      token: "https://api.line.me/oauth2/v2.1/token",
      userinfo: "https://api.line.me/v2/profile",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.displayName,
          image: profile.pictureUrl,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 24 * 24
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET || '',
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.access_token && user) {
        token.id = user.id;
        token.accessToken = account.access_token;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken && token.id) {
        session.accessToken = token.accessToken as string;
        session.user = {
          ...session.user,
          id: token.id as string,
        };
      }
      return session;
    },
    async signIn({ user, account }) {
      const provider = account?.provider;
      const uid = user?.id;
      const name = user?.name;
      const avatar = user?.image;

      try {
        const response = await axios.post(
          `${apiUrl}/auth/${provider}/callback`, {
          user: {
            provider,
            uid,
            name,
            avatar,
          }
        });
        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error message:", error.message);
          }
        } else if (error instanceof Error) {
          console.error("Error:", error.message);
        } else {
          console.error("An unknown error occurred");
        }
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };