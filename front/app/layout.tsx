import type { Metadata } from 'next'
import './globals.css'
import NextAuthProvider from './providers/NextAuth';
import Header from './components/top/Header';
import Footer from './components/top/Footer';
import { Toaster } from 'react-hot-toast';
import UserInfoProvider from './providers/UserInfoProvider';
import CosmeticsContextProvider from './providers/CosmeticsContextProvider';
import LoadingProvider from './providers/LoadingProvider';
import SessionProvider from './providers/SessionContextProvider';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(faXTwitter, faGithub);

export const metadata: Metadata = {
  metadataBase: new URL('https://korecare.vercel.app/'),
  title: 'KoreCare | 韓国コスメのスキンケア情報サービス',
  description: 'KoreCareは、韓国コスメに特化した毎日のスキンケアをサポートするサービスです。',
  openGraph: {
		title: 'KoreCare | 韓国コスメのスキンケア情報サービス',
    description: '韓国コスメのスキンケア情報サービス',
    siteName: "KoreCare",
	},
	twitter: {
		title: 'KoreCare | 韓国コスメのスキンケア情報サービス',
		description: '韓国コスメのスキンケア情報サービス',
    card: 'summary_large_image',
	},
}

export default function RootLayout({
  children,
}: {
    children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <SessionProvider>
            <CosmeticsContextProvider>
              <LoadingProvider>
                <UserInfoProvider>
                  <Header />
                  <Toaster
                    position="top-right"
                    reverseOrder={true}
                    containerStyle={{
                      zIndex: 9999,
                    }}
                  />
                  <div className='font-genjyuu bg-background-color min-h-screen text-text-color text-center'>
                    {children}
                  </div>
                  <Footer />
                </UserInfoProvider>
              </LoadingProvider>
            </CosmeticsContextProvider>
          </SessionProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
