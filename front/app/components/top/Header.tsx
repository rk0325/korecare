'use client';
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import AuthenticateLink from './AuthenticateLink';
import Dropdown from './Dropdown';

const Header = () => {
  const { data: session } = useSession();
  return (
    <header className='bg-background-color text-text-color font-genjyuu' style={{ top: 0, width: '100%'}}>
      <div className='h-20 w-full border-b-2 border-line-color flex items-center justify-between p-2'>
        <ul className='flex'>
          <li className='p-2 cursor-pointer'>
            <Link href='/'>Home</Link>
          </li>
        </ul>
        {session ? (
          <Dropdown />
        ) : (
          <AuthenticateLink />
        )}
      </div>
    </header>
  );
}

export default Header;