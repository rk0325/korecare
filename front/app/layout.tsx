import type { Metadata } from 'next'
import './globals.css'
import NextAuthProvider from './providers/NextAuth';
import Header from './components/top/Header';
import Footer from './components/top/Footer';
import { Toaster } from 'react-hot-toast';
import UserInfoProvider from './providers/UserInfoProvider';
import ProfileProvider from './providers/ProfileProvider';
import CosmeticsContextProvider from './providers/CosmeticsContextProvider';

export const metadata: Metadata = {
  title: 'korean cosmetics app',
  description: '韓国コスメに特化した、ユーザーのスキンケアをサポートするサービスです。',
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
            <ProfileProvider>
              <UserInfoProvider>
                <Header />
                <Toaster position="top-right" reverseOrder={true} />
                <div className='font-genjyuu min-h-screen'>
                  {children}
                </div>
                <Footer />
              </UserInfoProvider>
            </ProfileProvider>
          </CosmeticsContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
