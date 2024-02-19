'use client';
import React from 'react';
import FavoriteCosmetics from '../components/mypage/FavoriteCosmetics';

export default function FavoriteCosmeticsPage() {

  return (
    <div className='bg-background-color min-h-screen text-text-color font-genjyuu'>
      <p className="text-xl text-center justify-between pt-10">
        お気に入りコスメ一覧
      </p>
      <FavoriteCosmetics />
    </div>
  );
}