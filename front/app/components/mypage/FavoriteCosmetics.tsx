'use client';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Cosmetic } from '../../contexts/CosmeticsContext';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import axios from 'axios';
import { FavoriteIconAnim } from '@/components/ui/FavoriteIconAnim';
import { PropagateLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

// axiosのインスタンスを作成
const axiosInstance = axios.create({
  withCredentials: true,
});

// axiosInstanceを使用してリクエストを行うfetcher関数を定義
const fetcher = (url: string, headers: any) => axiosInstance.get(url, { headers }).then(res => res.data);

export const FavoriteCosmetics = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;

  // useMemoを使用してheadersをメモ化
  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const categories = ['化粧水', '美容液', 'クリーム'];

  // useSWRを使用してお気に入りコスメのデータを取得
  const { data: favoriteCosmetics, error } = useSWR<Cosmetic[]>(token ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/favorite_cosmetics` : null, () => fetcher(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/favorite_cosmetics`, headers));

  // データのロード状態を管理
  const isLoading = !favoriteCosmetics && !error;

  // お気に入りコスメの状態をMapで管理
  const [favoriteStatus, setFavoriteStatus] = useState(new Map());

  useEffect(() => {
    // お気に入り状態を初期化する
    if (favoriteCosmetics) {
      setFavoriteStatus(new Map(favoriteCosmetics.map(cosmetic => [cosmetic.item_code, true])));
    }
  }, [favoriteCosmetics]);

  // お気に入りに追加する関数
  const addToFavorites = useCallback(async (cosmetic: Cosmetic) => {
    console.log('cosmeticオブジェクトの中身:', cosmetic);
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
      console.log('APIからのレスポンス:', response.data);
    } catch (error) {
      console.error(error);
    }
  }, [headers, session?.user?.id]);

  // お気に入りから削除する関数
  const removeFromFavorites = useCallback(async (cosmeticId: string) => {
    // cosmeticIdがundefinedでないことを確認する
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

  // お気に入りの状態をトグルする関数
  const toggleFavorite = useCallback(async (cosmetic: Cosmetic) => {
    const currentStatus = favoriteStatus.get(cosmetic.item_code) || cosmetic.isFavorite;
    setFavoriteStatus(prevStatus => {
      const newStatus = new Map(prevStatus);
      newStatus.set(cosmetic.item_code, !currentStatus);
      return newStatus;
    });

    if (currentStatus) {
      await removeFromFavorites(cosmetic.item_code); // ここでお気に入りから削除
    } else {
      await addToFavorites(cosmetic); // ここでお気に入りに追加
    }
  }, [favoriteStatus, addToFavorites, removeFromFavorites]);

  useEffect(() => {
    // お気に入り状態を初期化する
    setFavoriteStatus(new Map(favoriteCosmetics?.map(cosmetic => [cosmetic.item_code, true])));
  }, [favoriteCosmetics]);

  function truncateName(name: string, maxLength: number = 36): string {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  }

  const shareOnTwitter = useCallback((cosmetic: Cosmetic) => {
    const truncatedName = truncateName(cosmetic.name, 50);
    const text = `${truncatedName}をお気に入りコスメに登録しました！ #KoreCare`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=https://korecare.vercel.app`;
    window.open(url, '_blank');
  }, []);

  return (
    <div className='bg-background-color font-genjyuu min-h-screen text-text-color text-center pb-10'>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <PropagateLoader color="#506D7D" />
        </div>
      ) : (
        categories.map((category) => {
          const filteredCosmetics = favoriteCosmetics?.filter(cosmetic =>
            cosmetic.name && cosmetic.name.toLowerCase().includes(category.toLowerCase())
          ) || [];
          return (
            <div key={category}>
              <h2 className="text-xl text-left pt-8 pl-10">{category}</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-center'>
                {filteredCosmetics.length > 0 ? (
                  filteredCosmetics.map((cosmetic, index) => (
                    <div key={index} className='flex flex-col items-center'>
                      <p className="line-clamp-2">
                        {truncateName(cosmetic.name)}
                      </p>
                      <div className="relative pt-4">
                        <Image
                          src={cosmetic.image_url}
                          alt={cosmetic.name}
                          width={500}
                          height={500}
                          style={{ objectFit: "contain", width: "auto" }}
                        />
                      </div>
                      <div className="flex justify-center items-center space-x-2 mt-2">
                        <button onClick={() => shareOnTwitter(cosmetic)}>
                          <FontAwesomeIcon icon={faXTwitter} className="text-text-color text-xl pl-4 pt-1" />
                        </button>
                        <button onClick={() => toggleFavorite(cosmetic)}>
                          <FavoriteIconAnim on={favoriteStatus.get(cosmetic.item_code) ?? false} />
                        </button>
                      </div>
                      <p className='pt-2'>{cosmetic.price}円</p>
                      <p>{cosmetic.brand}</p>
                      <Link href={cosmetic.item_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        商品ページへ
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600">このカテゴリーにはコスメがありません。</p>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default FavoriteCosmetics;