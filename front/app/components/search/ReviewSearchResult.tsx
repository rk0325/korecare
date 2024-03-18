'use client';
import React, { useContext, useState, useCallback, useMemo } from 'react';
import { CosmeticsContext, Cosmetic } from '../../contexts/CosmeticsContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import CustomButton from '@/components/ui/custom-button';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { FavoriteIconAnim } from '@/components/ui/FavoriteIconAnim';
import { PulseLoader } from 'react-spinners';

const ReviewSearchResult = () => {
  const { cosmetics, cosmeticSets } = useContext(CosmeticsContext);
  const { isLoading } = useContext(LoadingContext);
  const { data: session } = useSession();
  const token = session?.accessToken;
  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const addToFavorites = useCallback(async (cosmetic: Cosmetic) => {
    const favoriteCosmetic = {
      favorite_cosmetic: {
        user_id: session?.user?.id,
        item_code: cosmetic.id,
        name: cosmetic.itemName,
        brand: cosmetic.shopName,
        price: cosmetic.itemPrice,
        item_url: cosmetic.itemUrl,
        image_url: cosmetic.mediumImageUrl,
      }
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/favorite_cosmetics`, favoriteCosmetic, {
        headers: headers,
        withCredentials: true
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [headers, session?.user?.id]);

  function truncateName(name: string, maxLength: number = 46): string {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  }

  return (
    <div className='pt-4'>
    </div>
  );
}

export default ReviewSearchResult;