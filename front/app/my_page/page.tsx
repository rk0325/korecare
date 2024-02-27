"use client";
import React from 'react'
import Profile from '../components/mypage/Profile';

export default function MyPage() {

  return (
    <>
      <div className='p-10'>
        <p className='text-xl pb-6'>マイページ</p>
        <Profile />
      </div>
    </>
  );
}