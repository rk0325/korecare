"use client";
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useSession } from 'next-auth/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface User {
  id: number;
  name: string;
}

interface Review {
  userName: string;
  id: number;
  title: string;
  body: string;
  rating: string;
  visibility: boolean;
  user_id: number;
  item_url?: string;
  image_url?: string;
  price?: number;
  favorite_cosmetic_id?: number;
  user?: User;
}

interface FavoriteCosmetic {
  id: number;
  item_url: string;
  image_url: string;
  price: number;
}

interface ProductReviews {
  id: number;
  item_url: string;
  image_url: string;
  averageRating: number;
  reviewCount: number;
  reviews: Review[];
  price: number;
}

interface ApiResponse {
  id: number;
  title: string;
  body: string;
  rating: string;
  visibility: boolean;
  user_id: number;
  item_url?: string;
  image_url?: string;
  price?: number;
  favorite_cosmetic_id?: number;
  user: {
    id: number;
    name: string;
  };
}

export default function ReviewDetails() {
  const { data: session } = useSession();
  const [productReviews, setProductReviews] = useState<ProductReviews[]>([]);
  const token = session?.accessToken;
  const [reviews, setReviews] = useState<Review[]>([]);

  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  useEffect(() => {
    const fetchReviews = async () => {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get<ApiResponse[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews`, { headers });
      const reviewsWithUsers = response.data.map((review: ApiResponse) => ({
        ...review,
        userName: review.user?.name || '匿名'
      }));
      setReviews(reviewsWithUsers);
    };

    fetchReviews();
  }, [token]);

  const fetchFavoriteCosmetics = useCallback(async (): Promise<FavoriteCosmetic[]> => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/favorite_cosmetics`, {
        headers: headers,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("FavoriteCosmeticsの取得中にエラーが発生しました:", error);
      return [];
    }
  }, [headers]);

  const fetchUsers = useCallback(async (): Promise<User[]> => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users`, { headers: headers });
      const users = response.data.map((apiUser: any) => ({
        id: apiUser.id,
        name: apiUser.username,
      }));
      return users;
    } catch (error) {
      console.error("ユーザー情報の取得中にエラーが発生しました:", error);
      return [];
    }
  }, [headers]);

  useEffect(() => {
    const fetchAndCombineReviews = async () => {
      const favoriteCosmetics = await fetchFavoriteCosmetics();
      const users = await fetchUsers();
      const reviewsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      const reviews: Review[] = reviewsResponse.data;

      const enhancedReviews = reviews.map(review => {
        const cosmetic = favoriteCosmetics.find(c => c.id === review.favorite_cosmetic_id);
        const user = users.find(u => u.id === review.user_id);

        return {
          ...review,
          user: user ? { id: user.id, name: user.name } : undefined,
          cosmetic: cosmetic ? {
            id: cosmetic.id,
            item_url: cosmetic.item_url,
            image_url: cosmetic.image_url,
            price: cosmetic.price
          } : undefined,
        };
      });

      const productReviewsWithReviews = favoriteCosmetics.filter(cosmetic =>
        enhancedReviews.some(review => review.cosmetic?.id === cosmetic.id)
      ).map(cosmetic => {
        const cosmeticReviews = enhancedReviews.filter(review => review.cosmetic?.id === cosmetic.id);
        const averageRating = cosmeticReviews.reduce((acc, review) => acc + parseInt(review.rating), 0) / cosmeticReviews.length || 0;
        return {
          id: cosmetic.id,
          item_url: cosmetic.item_url,
          image_url: cosmetic.image_url,
          price: cosmetic.price,
          averageRating: isNaN(averageRating) ? 0 : averageRating,
          reviewCount: cosmeticReviews.length,
          reviews: cosmeticReviews.map(review => ({
            ...review,
            user: review.user,
          })),
        };
      });

      setProductReviews(productReviewsWithReviews);
    };

    fetchAndCombineReviews();
  }, [fetchFavoriteCosmetics, fetchUsers, token]);

  function truncateName(name: string, maxLength: number = 36): string {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  }

  function ratingToStars(rating: string) {
    const ratingNumber = parseInt(rating);
    return "★".repeat(ratingNumber);
  }

  return (
    session ? (
      <div className='flex flex-col space-y-4 p-10'>
        <h1 className='text-2xl md:text-3xl'>レビュー詳細</h1>
        <div className='flex flex-col items-center p-10'>
          {productReviews.map((productReview) => (
            <div key={productReview.id} className="w-full max-w-4xl">
              <div className="relative h-[200px]">
                <Image src={productReview.image_url} alt="" layout="fill" objectFit="contain" quality={100} />
              </div>
              <h2 className="text-lg">{truncateName(productReview.reviews[0]?.title ?? 'タイトル不明')}</h2>
              <p>{productReview.price}円</p>
              <p>平均評価: ★ {productReview.averageRating.toFixed(1)} ({productReview.reviewCount}件)</p>
              <Accordion type="single" collapsible className="mt-4">
                {productReview.reviews.map((review) => (
                  <AccordionItem key={review.id} value={`details-${review.id}`}>
                    <AccordionTrigger>投稿者: {review.userName}さん - {ratingToStars(review.rating)}</AccordionTrigger>
                    <AccordionContent>
                      <p>{review.body}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    ) : null
  );
}