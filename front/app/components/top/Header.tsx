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
    <header className='bg-custom-color text-text-color font-genjyuu shadow-custom w-full mb-2'>
      <div className='h-20 flex items-center justify-between p-4'>
        <ul className='flex'>
          <li className='p-2 cursor-pointer'>
            <Link href={linkHref}>KoreCare</Link>
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