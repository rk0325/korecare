'use client';
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Header = () => {
  const { data: session } = useSession();
  return (
    <header className='bg-background-color text-text-color font-genjyuu' style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
      <div className='h-20 w-full border-b-2 border-line-color flex items-center justify-between p-2'>
        <ul className='flex'>
          <li className='p-2 cursor-pointer'>
            <Link href='/'>Home</Link>
          </li>
        </ul>
        {session ? (
          <div className='flex items-center'>
            <p className='p-2'>ようこそ、{session.user?.name}さん</p>
            <Image
              src={session.user?.image ?? '/default-avatar.png'}
              alt="User Avatar"
              width={40}
              height={40}
              style={{ borderRadius: '50%' }}
            />
          </div>
        ) : (
          <ul className='flex'>
            <li className='p-2 cursor-pointer'>
              <Link href='/login'>Login</Link>
            </li>
            <li className='p-2 cursor-pointer'>
              <Link href='/signup'>Sign up</Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;