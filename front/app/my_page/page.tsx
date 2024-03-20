"use client";
import React from 'react'
import Profile from '../components/mypage/Profile';
import FavoriteCosmetics from '../components/mypage/FavoriteCosmetics';
import { Separator } from "@/components/ui/separator"

export default function MyPage() {

  return (
    <>
      <div className='p-10'>
        <p className='text-2xl md:text-3xl mb-6'>マイページ</p>
        <Profile />
        <div className='flex justify-center'>
          <Separator className='w-1/2 mt-10' />
        </div>
        <FavoriteCosmetics />
      </div>
    </>
  );
}