"use client";
import React from 'react'
import { useSession } from 'next-auth/react'
import ProfileForm from '../components/mypage/ProfileForm';

export default function MyPage() {
  const { data: session } = useSession();

  return (
    session ? (
      <div className='bg-background-color min-h-screen text-text-color text-center flex justify-center'>
        <div className='flex flex-col space-y-4 p-10'>
          <p>My Page</p>
          <ProfileForm />
        </div>
      </div>
    ) : null
  );
}