'use client';
import React from 'react';
import FavoriteCosmetics from '../components/mypage/FavoriteCosmetics';

export default function FavoriteCosmeticsPage() {

  return (
    <>
      <p className="text-2xl md:text-3xl text-center justify-between pt-10">
        お気に入りコスメ一覧
      </p>
      <FavoriteCosmetics />
    </>
  );
}