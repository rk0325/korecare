import type { Metadata } from 'next'
import './globals.css'
import NextAuthProvider from './providers/NextAuth';
import Header from './components/top/Header';
import Footer from './components/top/Footer';
import { Toaster } from 'react-hot-toast';
import UserInfoProvider from './UserInfoProvider';

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
          <Header />
          <Toaster position="top-right" reverseOrder={true} />
          <div className='font-genjyuu min-h-screen'>
            <UserInfoProvider>{children}</UserInfoProvider>
          </div>
        </NextAuthProvider>
        <Footer />
      </body>
    </html>
  );
}
