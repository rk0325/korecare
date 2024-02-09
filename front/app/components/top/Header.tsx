'use client';
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import AuthenticateLink from './AuthenticateLink';
import ResponsiveMenu from './ResponsiveMenu';

const Header = () => {
  const { data: session } = useSession();
  const linkHref = session ? '/home' : '/';

  return (
    <header className='bg-background-color text-text-color font-genjyuu shadow-xl' style={{ top: 0, width: '100%'}}>
      <div className='h-20 w-full border-b-2 border-line-color flex items-center justify-between p-2'>
        <ul className='flex'>
          <li className='p-2 cursor-pointer'>
            <Link href={linkHref}>韓 RECO</Link>
          </li>
        </ul>
        {session ? (
          <ResponsiveMenu />
        ) : (
          <AuthenticateLink />
        )}
      </div>
    </header>
  );
}

export default Header;