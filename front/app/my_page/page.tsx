"use client";
import React from 'react'
import Profile from '../components/mypage/Profile';

export default function MyPage() {

  return (
    <div className='bg-background-color min-h-screen text-text-color text-center flex justify-center font-genjyuu'>
      <div className='flex flex-col space-y-4 p-10'>
        <p className='text-2xl'>マイページ</p>
        <Profile />
      </div>
    </div>
  );
}