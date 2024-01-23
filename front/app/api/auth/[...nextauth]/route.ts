import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

declare module "next-auth" {
  /**
   * next-authのセッション管理にアクセストークンを追加するためにセッション型を拡張
   */
  interface Session {
    accessToken?: string;
    user?: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
    }
  }

  /**
   * 同様にユーザー型を拡張
   */
  interface User {
    id?: string;
  }
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
			profile(profile) {
				return {
					id: profile.sub, // 'sub'フィールドを'id'として使用
					name: profile.name,
					email: profile.email,
					image: profile.picture, // pictureをimageプロパティにマッピング
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
			const email = user?.email;

			try {
				const response = await axios.post(
					`${apiUrl}/auth/${provider}/callback`,
					{
						provider,
						uid,
						name,
						avatar,
						email,
					}
				);
				if (response.status === 200) {
					return true;
				} else {
					return false;
				}
			} catch (error) {
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };