"use client";
import React from 'react'
import { useSession } from 'next-auth/react'

export default function Home() {
	const { data: session } = useSession();

  return (
    session ? (
      <div className='bg-background-color min-h-screen text-text-color text-center flex justify-center font-genjyuu'>
        <div className='flex flex-col space-y-4 p-10'>
          <p className='text-2xl'>今日の紫外線と湿度</p>
          <p>マイページにてお住まいを登録していただくと、あなたの住んでいる場所の情報が表示されます。</p>
        </div>
      </div>
    ) : null
  );
}