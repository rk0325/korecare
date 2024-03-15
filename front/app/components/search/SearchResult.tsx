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

const SearchResult = () => {
  const { cosmetics, cosmeticSets } = useContext(CosmeticsContext);
  const { isLoading } = useContext(LoadingContext);
  const { data: session } = useSession();
  const token = session?.accessToken;
  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);
  const categories = ['化粧水', '美容液', 'クリーム'];
  const [favoriteStatus, setFavoriteStatus] = useState(new Map());

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

  const filterCosmeticsByFirstMatchingCategory = (cosmetic: Cosmetic) => {
    for (let category of categories) {
      if ((cosmetic.itemName ?? '').includes(category)) {
        return category;
      }
    }
    return null;
  };

  function truncateName(name: string, maxLength: number = 46): string {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  }

  return (
    <div className='pt-4'>
      {isLoading ? (
        <div className="flex justify-center min-h-screen pt-20">
          <PulseLoader color="#506D7D" />
        </div>
      ) : (
        <>
          {(cosmetics && cosmetics.length > 0) || (cosmeticSets && cosmeticSets.length > 0) ? (
            <>
              {cosmetics && categories.map((category) => {
                const filteredCosmetics = cosmetics.filter(cosmetic => filterCosmeticsByFirstMatchingCategory(cosmetic) === category);
                if (filteredCosmetics.length > 0) {
                  return (
                    <div key={category} className="flex justify-center">
                      <div className="w-full max-w-4xl">
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center'>
                          {filteredCosmetics.map((cosmetic, index) => (
                            <div key={index} className='shadow-md rounded-md overflow-hidden cursor-pointer max-w-sm'>
                              <div className='flex flex-col items-center px-4 py-2 sm:py-4 relative mb-2'>
                                <div
                                  onClick={() => window.open(cosmetic.itemUrl, "_blank")}
                                  className="relative z-0 pt-2 cursor-pointer text-center"
                                >
                                  <div className='flex flex-col items-center px-4 py-2 sm:py-4 relative mb-2'>
                                    <div className="relative z-0 pt-2 w-custom h-custom">
                                      <Image
                                        src={cosmetic.mediumImageUrl}
                                        alt={cosmetic.itemName}
                                        layout="fill"
                                        objectFit="contain"
                                        quality={100}
                                      />
                                    </div>
                                  </div>
                                  <p className="line-clamp-2 z-10 pt-2">{truncateName(cosmetic.itemName)}</p>
                                  <p className="z-10 relative mb-2">{cosmetic.itemPrice}円</p>
                                </div>
                                <div className="items-center space-x-2">
                                  <div className="absolute bottom-1 right-3">
                                    <button onClick={(e) => {
                                      e.stopPropagation();
                                      toggleFavorite(cosmetic);
                                    }}>
                                      <FavoriteIconAnim on={favoriteStatus.get(cosmetic.id) ?? false} />
                                    </button>
                                  </div>
                                </div>
                                <CustomButton onClick={() => window.open(cosmetic.itemUrl, "_blank")} colorClass="hover:bg-E0DBD2 hover:text-text-color">詳細を見る</CustomButton>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
              {cosmeticSets && cosmeticSets.length > 0 && (
                <div className="flex justify-center">
                  <div className="w-full max-w-4xl">
                    {cosmeticSets.map((set, index) => (
                      <div key={index} className="mb-4">
                        <p className="text-lg">合計金額: {set.total_price}円</p>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center'>
                          {Object.entries(set).filter(([key, _]) => key !== 'total_price').map(([key, value], index) => {
                            if (typeof value === 'object' && value !== null && 'itemUrl' in value) {
                              const cosmetic = value;
                              return (
                                <div key={`${index}`} className='shadow-md rounded-md overflow-hidden cursor-pointer max-w-sm'>
                                  <div className='flex flex-col items-center px-4 py-2 sm:py-4 relative mb-2'>
                                    <div
                                      onClick={() => window.open(cosmetic.itemUrl, "_blank")}
                                      className="relative z-0 pt-2 cursor-pointer text-center"
                                    >
                                      <div className='flex flex-col items-center px-4 py-2 sm:py-4 relative'>
                                        <div className="relative z-0 pt-2 w-custom h-custom">
                                          <Image
                                            src={cosmetic.mediumImageUrl}
                                            alt={cosmetic.itemName}
                                            layout="fill"
                                            objectFit="contain"
                                            quality={100}
                                          />
                                        </div>
                                      </div>
                                      <p className="line-clamp-2 z-10 pt-2">{cosmetic.itemName}</p>
                                      <p className="z-10 relative mb-2">{cosmetic.itemPrice}円</p>
                                    </div>
                                    <div className="items-center space-x-2">
                                      <div className="absolute bottom-1 right-3">
                                        <button onClick={(e) => {
                                          e.stopPropagation();
                                          toggleFavorite(cosmetic);
                                        }}>
                                          <FavoriteIconAnim on={favoriteStatus.get(cosmetic.id) ?? cosmetic.isFavorite} />
                                        </button>
                                      </div>
                                    </div>
                                    <CustomButton onClick={() => window.open(cosmetic.itemUrl, "_blank")} colorClass="hover:bg-E0DBD2 hover:text-text-color">詳細を見る</CustomButton>
                                  </div>
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : null}
        </>
      )}
    </div>
  );
}

export default SearchResult;