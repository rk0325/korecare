"use client";
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useSession } from 'next-auth/react'
import ReviewSearchForm from '../components/search/ReviewSearchForm';
import ReviewSearchResult from '../components/search/ReviewSearchResult';
import {
  AlertTriangle,
  AlertCircle,
  X
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SearchParams {
  skinType: string;
  skinTrouble: string;
  priceRange: string;
  productType: string;
}

interface Review {
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
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
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

export default function Reviews() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = session?.accessToken;
  const [productReviews, setProductReviews] = useState<ProductReviews[]>([]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (params: SearchParams) => {
    console.log(params);
  };

  const fetchFavoriteCosmetics = useCallback(async (): Promise<FavoriteCosmetic[]> => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/favorite_cosmetics`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("FavoriteCosmeticsの取得中にエラーが発生しました:", error);
      return [];
    }
  }, [token]);

  useEffect(() => {
    const fetchAndCombineReviews = async () => {
      const favoriteCosmetics = await fetchFavoriteCosmetics();
      const reviewsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      const reviews: Review[] = reviewsResponse.data;

      const productReviewsMap: { [key: number]: ProductReviews } = {};
      reviews.forEach(review => {
        const cosmetic = favoriteCosmetics.find(c => c.id === review.favorite_cosmetic_id);
        if (!cosmetic) return;

        if (!productReviewsMap[cosmetic.id]) {
          productReviewsMap[cosmetic.id] = {
            id: cosmetic.id,
            item_url: cosmetic.item_url,
            image_url: cosmetic.image_url,
            averageRating: 0,
            reviewCount: 0,
            reviews: [],
            price: cosmetic.price,
          };
        }

        productReviewsMap[cosmetic.id].reviews.push(review);
      });

      const ratings = {
        very_bad: 1,
        bad: 2,
        normal: 3,
        good: 4,
        very_good: 5,
      };

      const productReviewsArray: ProductReviews[] = Object.values(productReviewsMap).map(productReview => {
        const averageRating = productReview.reviews.reduce((acc, review) => {
          const ratingValue = ratings[review.rating as keyof typeof ratings];
          return acc + (ratingValue || 0);
        }, 0) / productReview.reviews.length;
        return {
          ...productReview,
          averageRating,
          reviewCount: productReview.reviews.length,
        };
      });

      setProductReviews(productReviewsArray);
    };
      fetchAndCombineReviews();
  }, [fetchFavoriteCosmetics, token]);

  function truncateName(name: string, maxLength: number = 36): string {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  }

  return (
    session ? (
      <>
        <div className='flex flex-col space-y-4 p-10'>
          <div className='text-2xl md:text-3xl'>
            レビュー一覧
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="ml-1 p-1 rounded-full bg-background-color border border-gray-200 shadow" onClick={() => setIsModalOpen(true)}>
                    <AlertCircle className="h-5 w-5" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>検索時の注意点</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <input type="checkbox" id="weather-modal" className="modal-toggle" checked={isModalOpen} onChange={() => setIsModalOpen(!isModalOpen)} />
          <div className="modal" onClick={handleCloseModal}>
            <div className="modal-box text-left" onClick={e => e.stopPropagation()}>
              <div className="flex justify-end">
                <div onClick={handleCloseModal} className="btn btn-ghost btn-circle">
                  <X />
                </div>
              </div>
              <div className="flex items-start mb-2">
                <AlertTriangle className="mr-1 h-5 w-5" />
                <p className='marked-text'>注意事項</p>
              </div>
              <p>レビュー投稿に付けられたタグで商品を検索できます。検索結果が表示されない場合、該当のレビュー投稿がない可能性があります。条件を変更して検索してみてください。</p>
            </div>
          </div>
          <div className='flex flex-col items-center space-y-4 p-10'>
            <ReviewSearchForm onSearch={handleSearch} />
            <ReviewSearchResult />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
              {productReviews.map((productReview) => (
                <div key={productReview.id} className="shadow-md rounded-md overflow-hidden cursor-pointer max-w-sm mx-auto">
                  {productReview.image_url && (
                    <div className="relative h-[200px]">
                      <Image src={productReview.image_url} alt="" layout="fill" objectFit="contain" quality={100} />
                    </div>
                  )}
                  <div className="p-4 text-center">
                    <h3 className="font-bold">{truncateName(productReview.reviews[0].title)}</h3>
                    <p>{`★ ${productReview.averageRating.toFixed(1)} (${productReview.reviewCount}件)`}</p>
                    <p>{productReview.price}円</p>
                    <a href={`/reviews/${productReview.id}`} target="_self" rel="noopener noreferrer">レビュー詳細へ</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    ) : null
  );
}