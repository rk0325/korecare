'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useProfile } from '../../hooks/useProfile';
import axios from 'axios';
import Image from 'next/image';
import CustomButton from '@/components/ui/custom-button';
import { FavoriteIconAnim } from '@/components/ui/FavoriteIconAnim';
import { SyncLoader } from 'react-spinners';
import { RecommendedCosmeticsProps } from '../../types';
import { Cosmetic } from './search.type';

const RecommendedCosmetics: React.FC<RecommendedCosmeticsProps> = ({ searchParams, hasSearched }) => {
  const [recommendedCosmetics, setRecommendedCosmetics] = useState<Cosmetic[]>([]);
  const [profileBasedCosmetics, setProfileBasedCosmetics] = useState<Cosmetic[]>([]);
  const { data: session } = useSession();
  const { profile } = useProfile();
  const token = session?.accessToken;
  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);
  const [favoriteStatus, setFavoriteStatus] = useState(new Map());
  const [isLoading, setIsLoading] = useState(false);

  const addToFavorites = useCallback(async (cosmetic: Cosmetic) => {
    const favoriteCosmetic = {
      favorite_cosmetic: {
        user_id: session?.user?.id,
        item_code: cosmetic.id,
        name: cosmetic.itemName,
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

  const removeFromFavorites = useCallback(async (cosmeticId: string) => {
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
    const currentStatus = favoriteStatus.get(cosmetic.id) || cosmetic.isFavorite;
    if (currentStatus) {
      await removeFromFavorites(cosmetic.id);
      setFavoriteStatus(prevStatus => new Map(prevStatus).set(cosmetic.id, false));
    } else {
      await addToFavorites(cosmetic);
      setFavoriteStatus(prevStatus => new Map(prevStatus).set(cosmetic.id, true));
    }
  }, [favoriteStatus, setFavoriteStatus, addToFavorites, removeFromFavorites]);

  useEffect(() => {
    const fetchCosmetics = async () => {
      setIsLoading(true);
      try {
        if (Object.values(searchParams).some(param => param !== '')) {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/search_cosmetics/recommendations`, searchParams, { headers, withCredentials: true });
          setRecommendedCosmetics(response.data);
        }

        if (hasSearched) {
          const profileResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/search_cosmetics/profile_recommendations`, profile, { headers, withCredentials: true });
          setProfileBasedCosmetics(profileResponse.data);
        }
      } catch (error) {
        console.error('商品の取得に失敗しました', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCosmetics();
  }, [hasSearched, searchParams, headers, profile]);

    if (isLoading) {
    return (
      <div className="flex justify-center pt-20">
        <SyncLoader color="#506D7D" />
      </div>
    );
  }

  return (
    <>
      {recommendedCosmetics.length > 0 && (
        <div className="flex justify-center">
          <div className='mt-4 w-full max-w-4xl justify-center'>
            <h2 className='text-xl md:text-2xl font-semibold mb-4'>こちらもおすすめ</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center'>
              {recommendedCosmetics.map((cosmetic, index) => (
                <div key={index} className='shadow-md rounded-md overflow-hidden max-w-sm'>
                  <div className='flex flex-col items-center px-4 py-2 sm:py-4 relative mb-2'>
                    <div className="relative z-0 pt-2 w-custom h-custom">
                      <Image
                        src={cosmetic.mediumImageUrl || ''}
                        alt={cosmetic.itemName}
                        layout="fill"
                        objectFit="contain"
                        quality={100}
                      />
                    </div>
                    <p className="line-clamp-2 z-10 pt-2">{cosmetic.itemName}</p>
                    <p className="z-10 relative mb-2">{cosmetic.itemPrice}円</p>
                    <div className="absolute bottom-1 right-3">
                      <button onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(cosmetic);
                      }}>
                        <FavoriteIconAnim on={favoriteStatus.get(cosmetic.id) ?? false} />
                      </button>
                    </div>
                    <CustomButton onClick={() => window.open(cosmetic.itemUrl, "_blank")} colorClass="hover:bg-E0DBD2 hover:text-text-color">詳細を見る</CustomButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {profileBasedCosmetics.length > 0 && (
        <div className="flex flex-col items-center">
          <div className='mt-4 w-full max-w-4xl justify-center'>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">{profile?.skin_type} × {profile?.skin_trouble} の<br />{profile?.name}さんには<br />こちらもおすすめ</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center'>
              {profileBasedCosmetics.map((cosmetic, index) => (
                <div key={index} className='shadow-md rounded-md overflow-hidden max-w-sm'>
                  <div className='flex flex-col items-center px-4 py-2 sm:py-4 relative mb-2'>
                    <div className="relative z-0 pt-2 w-custom h-custom">
                      <Image
                        src={cosmetic.mediumImageUrl || ''}
                        alt={cosmetic.itemName}
                        layout="fill"
                        objectFit="contain"
                        quality={100}
                      />
                    </div>
                    <p className="line-clamp-2 z-10 pt-2">{cosmetic.itemName}</p>
                    <p className="z-10 relative mb-2">{cosmetic.itemPrice}円</p>
                    <div className="absolute bottom-1 right-3">
                      <button onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(cosmetic);
                      }}>
                        <FavoriteIconAnim on={favoriteStatus.get(cosmetic.id) ?? false} />
                      </button>
                    </div>
                    <CustomButton onClick={() => window.open(cosmetic.itemUrl, "_blank")} colorClass="hover:bg-E0DBD2 hover:text-text-color">詳細を見る</CustomButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecommendedCosmetics;