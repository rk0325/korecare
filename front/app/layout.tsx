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
import { GoogleAnalytics } from "@next/third-parties/google";

library.add(faXTwitter, faGithub);

export const metadata: Metadata = {
  metadataBase: new URL('https://korecare.jp/'),
  title: 'KoreCare | 韓国コスメのスキンケア情報サービス',
  description: 'KoreCare（コリケア）は、韓国コスメに特化したスキンケア情報サービスです。',
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
      <GoogleAnalytics gaId="G-1DTNZ1QZR1" />
    </html>
  );
}
