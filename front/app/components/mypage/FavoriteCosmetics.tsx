'use client';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Cosmetic } from '../../contexts/CosmeticsContext';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import axios from 'axios';
import { FavoriteIconAnim } from '@/components/ui/FavoriteIconAnim';
import { PulseLoader } from 'react-spinners';
import CustomButton from '@/components/ui/custom-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

const axiosInstance = axios.create({
  withCredentials: true,
});

const fetcher = (url: string, headers: any) => axiosInstance.get(url, { headers }).then(res => res.data);

export const FavoriteCosmetics = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const categories = ['化粧水', '美容液', 'クリーム'];
  const { data: favoriteCosmetics, error } = useSWR<Cosmetic[]>(token ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/favorite_cosmetics` : null, () => fetcher(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/favorite_cosmetics`, headers));
  const isLoading = !favoriteCosmetics && !error;
  const [favoriteStatus, setFavoriteStatus] = useState(new Map());

  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  useEffect(() => {
    if (favoriteCosmetics) {
      setFavoriteStatus(new Map(favoriteCosmetics.map(cosmetic => [cosmetic.item_code, true])));
    }
  }, [favoriteCosmetics]);

  const addToFavorites = useCallback(async (cosmetic: Cosmetic) => {
    const favoriteCosmetic = {
      favorite_cosmetic: {
        user_id: session?.user?.id,
        item_code: cosmetic.item_code,
        name: cosmetic.name,
        brand: cosmetic.brand,
        price: cosmetic.price,
        item_url: cosmetic.item_url,
        image_url: cosmetic.image_url,
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

  const removeFromFavorites = useCallback(async (cosmeticId: string) => {
  if (typeof cosmeticId === 'undefined') {
    console.error('cosmeticIdがundefinedです');
    return;
  }
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/favorite_cosmetics/${cosmeticId}`, {
        headers: headers,
        withCredentials: true
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [headers]);

  const toggleFavorite = useCallback(async (cosmetic: Cosmetic) => {
    const currentStatus = favoriteStatus.get(cosmetic.item_code) || cosmetic.isFavorite;
    setFavoriteStatus(prevStatus => {
      const newStatus = new Map(prevStatus);
      newStatus.set(cosmetic.item_code, !currentStatus);
      return newStatus;
    });

    if (currentStatus) {
      await removeFromFavorites(cosmetic.item_code);
    } else {
      await addToFavorites(cosmetic);
    }
  }, [favoriteStatus, addToFavorites, removeFromFavorites]);

  useEffect(() => {
    setFavoriteStatus(new Map(favoriteCosmetics?.map(cosmetic => [cosmetic.item_code, true])));
  }, [favoriteCosmetics]);

  function truncateName(name: string, maxLength: number = 36): string {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  }

  const shareOnTwitter = useCallback((cosmetic: Cosmetic) => {
    const truncatedName = truncateName(cosmetic.name, 50);
    const text = `${truncatedName}をお気に入りに登録しました！ #KoreCare`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=https://korecare.vercel.app`;
    window.open(url, '_blank');
  }, []);

  return (
    <div className='pb-10'>
      {isLoading ? (
        <div className="flex justify-center min-h-screen pt-20">
          <PulseLoader color="#506D7D" />
        </div>
      ) : (
        categories.map((category) => {
          const filteredCosmetics = favoriteCosmetics?.filter(cosmetic =>
            cosmetic.name && cosmetic.name.toLowerCase().includes(category.toLowerCase())
          ) || [];
          return (
            <div key={category} className="flex justify-center">
              <div className="w-full max-w-4xl p-1">
                <h2 className="text-lg z-10 bg-E0DBD2 py-1 px-3 rounded-lg inline-block mt-4 mb-2">{category}</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-center'>
                  {filteredCosmetics.length > 0 ? (
                    filteredCosmetics.map((cosmetic, index) => (
                      <div key={index} className='shadow-md rounded-md overflow-hidden cursor-pointer max-w-sm'
                        onClick={() => window.open(cosmetic.item_url, "_blank")}>
                        <div className='flex flex-col items-center px-4 py-2 sm:py-4 relative'>
                          <div className="relative z-0 pt-2 w-custom h-custom">
                            <Image
                              src={cosmetic.image_url}
                              alt={cosmetic.name}
                              layout="fill"
                              objectFit="contain"
                              quality={100}
                            />
                          </div>
                          <div className="flex justify-center items-center space-x-4 mt-1 pl-4">
                            <button onClick={(e) => {
                              e.stopPropagation();
                              shareOnTwitter(cosmetic);
                            }}>
                              <FontAwesomeIcon icon={faXTwitter} className="text-text-color text-xl mt-1" />
                            </button>
                            <button onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(cosmetic);
                            }}>
                              <FavoriteIconAnim on={favoriteStatus.get(cosmetic.item_code) ?? false} />
                            </button>
                          </div>
                        </div>
                        <p className="line-clamp-2 z-10 mb-2 pr-2 pl-2">{truncateName(cosmetic.name)}</p>
                        <p className="z-10 relative mb-2">{cosmetic.price}円</p>
                        <div className="flex justify-center items-center mt-2 mb-2">
                          <CustomButton colorClass="hover:bg-E0DBD2 hover:text-text-color">詳細を見る</CustomButton>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                      <p className="text-center text-gray-600 whitespace-nowrap">このカテゴリーにはコスメがありません。</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default FavoriteCosmetics;