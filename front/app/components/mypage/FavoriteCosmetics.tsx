'use client';
import React, { useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { CosmeticsContext, Cosmetic } from '../../contexts/CosmeticsContext';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { FavoriteIconAnim } from '../../components/FavoriteIconAnim';

export const FavoriteCosmetics = () => {
  const { cosmetics } = useContext(CosmeticsContext);
  console.log('Cosmetics from context:', cosmetics); // デバッグ情報を出力
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log('セッションステータス:', status);
    console.log('セッションデータ:', session);
  }, [session, status]);
  const token = session?.accessToken;
  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const categories = ['化粧水', '美容液', 'クリーム'];
  const [favoriteStatus, setFavoriteStatus] = useState(new Map());
  const [favoriteCosmetics, setFavoriteCosmetics] = useState<Cosmetic[]>([]);

  // データがロード中であることを示す状態を追加
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    console.log('使用する認証ヘッダー:', headers);
    console.log('fetchFavoritesが呼び出されたよ');
    if (token) {
      try {
        console.log('APIリクエストを送信したよ:', `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/favorite_cosmetics`);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/favorite_cosmetics`, {
          headers: headers,
          withCredentials: true
        });
        console.log('APIからのレスポンス:', response.data); // APIレスポンスの内容を確認

        // レスポンスデータがオブジェクトの配列である場合の処理
        if (Array.isArray(response.data)) {
          const cosmeticsData = response.data.map(item => ({
            id: item.item_code,
            name: item.name,
            category: item.category,
            itemName: item.name,
            shopName: item.brand,
            itemPrice: item.price,
            itemUrl: item.item_url,
            mediumImageUrl: item.image_url,
            item_code: item.item_code,
            image_url: item.image_url,
            brand: item.brand,
            price: item.price,
            item_url: item.item_url,
          }));
          console.log('変換後のデータ:', cosmeticsData); // 変換後のデータを確認
          setFavoriteCosmetics(cosmeticsData); // 状態を更新
          setIsLoading(false); // ロード状態を解除
        }
      } catch (error) {
        console.error('お気に入りコスメの情報取得に失敗したよ:', error);
        setIsLoading(false); // ロード状態を解除
      }
    }
  }, [token, headers]); // fetchFavorites関数をuseCallbackでメモ化

  useEffect(() => {
    if (status === 'authenticated') {
      fetchFavorites();
    }
  }, [status, fetchFavorites]); // statusとfetchFavoritesが変わるたびにこのeffectが実行される

  // データが更新されたことを示すuseEffect
  useEffect(() => {
    if (!isLoading) {
      console.log('お気に入りコスメの状態が更新されたよ:', favoriteCosmetics);
    }
  }, [favoriteCosmetics, isLoading]);

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
    setFavoriteStatus(new Map(favoriteCosmetics.map(cosmetic => [cosmetic.item_code, true])));
  }, [favoriteCosmetics]);

  // レンダリング部分でisLoadingをチェック
  return (
    <div className='bg-background-color min-h-screen text-text-color text-center pb-10'>
      {categories.map((category) => {
        // ここでカテゴリーに基づいてフィルタリング
        const filteredCosmetics = cosmetics.filter(cosmetic =>
          cosmetic.name && cosmetic.name.toLowerCase().includes(category.toLowerCase())
        );
        return (
          <div key={category}>
            <h2 className="text-xl font-bold text-left pt-8 pl-10">{category}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-center'>
              {filteredCosmetics.length > 0 ? (
                filteredCosmetics.map((cosmetic, index) => (
                  <div key={index} className='relative flex flex-col items-center p-2'>
                    <p className="line-clamp-2">
                      {cosmetic.name}
                    </p>
                    <div className="relative">
                      <Image
                        src={cosmetic.image_url}
                        alt={cosmetic.name}
                        width={500}
                        height={500}
                        style={{ objectFit: "contain", width: "auto" }}
                      />
                      <button
                        onClick={() => toggleFavorite(cosmetic)}
                        className="absolute bottom-0 right-0 p-4 m-2"
                        style={{ transform: 'translate(45%, 85%)' }} // ボタンを右下に配置
                      >
                        <FavoriteIconAnim on={favoriteStatus.get(cosmetic.item_code) ?? false} />
                      </button>
                    </div>
                    <p className='pt-10'>{cosmetic.price}円</p>
                    <p>{cosmetic.brand}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">お気に入りのコスメはありません。</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FavoriteCosmetics;