'use client';
import React, { useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { CosmeticsContext, Cosmetic } from '../contexts/CosmeticsContext';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { FavoriteIconAnim } from '../components/FavoriteIconAnim';

export default function FavoriteCosmeticsPage() {
  const { cosmetics } = useContext(CosmeticsContext);
  const { data: session } = useSession();
  const token = session?.accessToken;
  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const categories = ['化粧水', '美容液', 'クリーム'];
  const [favoriteStatus, setFavoriteStatus] = useState(new Map());
  const [favoriteCosmetics, setFavoriteCosmetics] = useState<Cosmetic[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (token) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/favorite_cosmetics`, {
            headers: headers,
            withCredentials: true
          });
          console.log('API Response:', response.data); // APIレスポンスの内容を確認

          // レスポンスデータがオブジェクトの配列である場合の処理
          if (Array.isArray(response.data)) {
            const cosmeticsData = response.data.map(item => ({
              id: item.item_code,
              itemName: item.name,
              shopName: item.brand,
              itemPrice: item.price,
              itemUrl: item.item_url,
              mediumImageUrl: item.image_url,
            }));
            console.log('Transformed Data:', cosmeticsData); // 変換後のデータを確認
            setFavoriteCosmetics(cosmeticsData); // 状態を更新
          } else {
            // レスポンスデータの構造が予期されたものでない場合のエラーハンドリング
            console.error('Unexpected response data structure:', response.data);
          }
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };

    fetchFavorites();
  }, [token, headers]);


  // お気に入りに追加する関数
  const addToFavorites = useCallback(async (cosmetic: Cosmetic) => {
    console.log('cosmeticオブジェクトの中身', cosmetic);
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

  // お気に入りから削除する関数
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

  // お気に入りの状態をトグルする関数
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

  return (
    <div className='bg-background-color min-h-screen text-text-color text-center'>
      <p className="text-2xl font-bold text-center justify-between pt-10">
        お気に入りコスメ一覧
      </p>
      {categories.map((category) => {
        const filteredCosmetics = cosmetics.filter(cosmetic => cosmetic.itemName.includes(category));
        if (filteredCosmetics.length === 0) {
          return null; // アイテムが存在しない場合は何も表示しない
        }
        return (
          <div key={category}>
            <h2 className="text-xl font-bold text-center pt-5">{category}</h2>
            <div className='flex flex-col md:flex-row md:space-x-4 p-8 justify-center flex-wrap'>
              {favoriteCosmetics.length > 0 ? (
                favoriteCosmetics.map((cosmetic, index) => (
                  <div key={index} className='flex flex-col items-center p-4'>
                    <p className="pb-2">
                      {cosmetic.itemName?.length > 40 ? `${cosmetic.itemName.substring(0, 40)}...` : cosmetic.itemName}
                    </p>
                    <Image
                      src={cosmetic.mediumImageUrl}
                      alt={cosmetic.itemName}
                      width={500}
                      height={500}
                      style={{ objectFit: "contain", width: "auto" }}
                    />
                    <button onClick={() => toggleFavorite(cosmetic)}>
                      <FavoriteIconAnim on={true} />
                    </button>
                    <p>{cosmetic.shopName}</p>
                    <p>{cosmetic.itemPrice}円</p>
                  </div>
                ))
              ) : (
                <p>お気に入りのコスメはありません。</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}