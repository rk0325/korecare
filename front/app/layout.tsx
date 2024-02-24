import type { Metadata } from 'next'
import './globals.css'
import NextAuthProvider from './providers/NextAuth';
import Header from './components/top/Header';
import Footer from './components/top/Footer';
import { Toaster } from 'react-hot-toast';
import UserInfoProvider from './providers/UserInfoProvider';
import CosmeticsContextProvider from './providers/CosmeticsContextProvider';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faXTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(faXTwitter, faGithub);

export const metadata: Metadata = {
  title: 'KoreCare｜コリケア',
  description: 'KoreCareは、韓国コスメに特化した毎日のスキンケアをサポートするサービスです。',
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
          <CosmeticsContextProvider>
            <UserInfoProvider>
              <Header />
              <Toaster
                position="top-right"
                reverseOrder={true}
                containerStyle={{
                  zIndex: 9999,
                }}
              />
              <div className='font-genjyuu bg-background-color min-h-screen text-text-color'>
                {children}
              </div>
              <Footer />
            </UserInfoProvider>
          </CosmeticsContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
