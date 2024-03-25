"use client";
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import Image from 'next/image';
import { useSession } from 'next-auth/react'
import { Review, ProductReviews } from './review.type'
import CustomButton from '@/components/ui/custom-button';
import { SyncLoader } from 'react-spinners';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  AlertCircle,
  X
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Reviews() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = session?.accessToken;
  const [productReviews, setProductReviews] = useState<ProductReviews[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [skinType, setSkinType] = useState("");
  const [skinTrouble, setSkinTrouble] = useState("");
  const [age, setAge] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchAndCombineReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const reviewsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews`, {
        headers: headers,
        withCredentials: true,
      });
      const reviews: Review[] = reviewsResponse.data;

      const productReviewsMap: { [key: string]: ProductReviews } = {};
      reviews.forEach(review => {
        const cosmetic = review.favorite_cosmetic;
        if (!cosmetic) return;

        const key = cosmetic.item_code;
        if (!productReviewsMap[key]) {
          productReviewsMap[key] = {
            id: review.id,
            item_url: cosmetic,
            image_url: cosmetic.image_url,
            averageRating: 0,
            reviewCount: 0,
            reviews: [],
            price: cosmetic.price,
            item_code: cosmetic.item_code,
          };
        }

        productReviewsMap[key].reviews.push(review);
      });

      const ratings = {
        very_bad: 1,
        bad: 2,
        medium: 3,
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
          image_url: productReview.image_url || '/image.png',
          price: typeof productReview.price === 'number' ? productReview.price : parseInt(productReview.price) || '参考価格',
        };
      });
      setProductReviews(productReviewsArray);
    } catch (error) {
      console.error("データ取得失敗:", error);
    }
    setIsLoading(false);
  }, [headers]);

  useEffect(() => {
    fetchAndCombineReviews();
  }, [fetchAndCombineReviews]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const selectedTags = [skinType, skinTrouble, age].filter(tag => tag !== "");
    const queryString = `tags=${selectedTags.join(',')}`;

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews?${queryString}`, {
        headers: headers,
        withCredentials: true,
      });

    if (Array.isArray(response.data)) {
      const currentUserId = session?.user?.id;
      const visibleReviews = response.data.filter((review: Review) => review.visibility || review.user_id === currentUserId);

      const productReviewsMap: { [key: string]: ProductReviews } = {};
      visibleReviews.forEach(review => {
        const cosmetic = review.favorite_cosmetic;
        if (!cosmetic) return;

        const key = cosmetic.item_code;
        if (!productReviewsMap[key]) {
          productReviewsMap[key] = {
            id: review.id,
            item_url: cosmetic,
            image_url: cosmetic.image_url,
            averageRating: 0,
            reviewCount: 0,
            reviews: [],
            price: cosmetic.price,
            item_code: cosmetic.item_code,
          };
        }

        productReviewsMap[key].reviews.push(review);
      });

      const ratings = {
        very_bad: 1,
        bad: 2,
        medium: 3,
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
          image_url: productReview.image_url || '/image.png',
          price: typeof productReview.price === 'number' ? productReview.price : parseInt(productReview.price) || '参考価格',
        };
      });

      setProductReviews(productReviewsArray);
    } else {
      console.error('response.data is not an array.');
    }
    setSearchPerformed(true);
  } catch (error) {
    console.error('検索中にエラーが発生しました:', error);
  } finally {
    setIsLoading(false);
  }
  };

    const resetForm = () => {
    setSkinType("");
    setSkinTrouble("");
    setAge("");
    setSearchPerformed(false);
    fetchAndCombineReviews();
  };

  function truncateName(name: string, maxLength: number = 40): string {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  }

  const renderProductReviews = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center pt-20">
          <SyncLoader color="#506D7D" />
        </div>
      );
    } else if (!isLoading && searchPerformed && productReviews.length === 0) {
      return (
        <div className='flex justify-center items-center text-center text-xl w-full py-20'>
          検索結果がありません
        </div>
      );
    } else {
      return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
          {productReviews.map((productReview) => (
            <div key={productReview.item_code} className="shadow-md rounded-md overflow-hidden max-w-sm mx-auto">
              {productReview.image_url && (
                <div className="flex items-center justify-center h-[150px] mt-4">
                  <Image src={productReview.image_url || '/image.png'} alt="Image" width={128} height={128} objectFit="contain" quality={100} />
                </div>
              )}
              <div className="p-4 text-center">
                <h3 className="text-lg">
                  {Array.isArray(productReview.reviews) && productReview.reviews.length > 0 ? truncateName(productReview.reviews[0].title) : 'レビュータイトルがありません'}
                </h3>
                <p>{`★ ${productReview.averageRating ? productReview.averageRating.toFixed(1) : '0.0'} (${productReview.reviewCount}件)`}</p>
                <p>{productReview.price}円</p>
                <div className="flex justify-center mt-2">
                  <CustomButton
                    colorClass="hover:bg-E0DBD2 hover:text-text-color"
                    onClick={() => router.push(`/reviews/${productReview.item_code}`)}
                  >
                    レビュー詳細へ
                  </CustomButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    session ? (
      <>
        <div className='flex flex-col space-y-4 pt-10 pr-4 pl-4'>
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
                <Search className="mr-1 h-5 w-5" />
                <p className='marked-text'>レビューを検索してみよう！</p>
              </div>
              <p>レビューに付けられたタグで皆さんのレビューを検索できます。検索結果が表示されない場合、該当のレビューがない可能性があります。条件を変更して検索してみてください。</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center space-y-4 p-10'>
          <div className='w-full max-w-3xl'>
            <form onSubmit={handleSearch} className='w-full'>
              <div className='flex flex-col items-center md:flex-row md:space-x-4 space-y-8 md:space-y-0'>
                <Select value={skinType} onValueChange={value => setSkinType(value)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue className="text-text-color" placeholder="肌質" />
                  </SelectTrigger>
                  <SelectContent className="text-text-color">
                    <SelectItem value="乾燥肌">乾燥肌</SelectItem>
                    <SelectItem value="混合肌">混合肌</SelectItem>
                    <SelectItem value="脂性肌">脂性肌</SelectItem>
                    <SelectItem value="普通肌">普通肌</SelectItem>
                    <SelectItem value="敏感肌">敏感肌</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={skinTrouble} onValueChange={value => setSkinTrouble(value)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue className="text-text-color" placeholder="お悩み" />
                  </SelectTrigger>
                  <SelectContent className="text-text-color">
                    <SelectItem value="保湿">保湿</SelectItem>
                    <SelectItem value="ニキビ">ニキビ</SelectItem>
                    <SelectItem value="毛穴・黒ずみ">毛穴・黒ずみ</SelectItem>
                    <SelectItem value="美白">美白</SelectItem>
                    <SelectItem value="肌のハリ・弾力">肌のハリ・弾力</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={age} onValueChange={value => setAge(value)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue className="text-text-color" placeholder="年代" />
                  </SelectTrigger>
                  <SelectContent className="text-text-color">
                    <SelectItem value="10代">10代</SelectItem>
                    <SelectItem value="20代">20代</SelectItem>
                    <SelectItem value="30代">30代</SelectItem>
                    <SelectItem value="40代">40代</SelectItem>
                    <SelectItem value="50代">50代</SelectItem>
                    <SelectItem value="60代以上">60代以上</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <button
                    type="submit"
                    className={`btn-506D7D flex justify-center items-center rounded-md h-[40px] w-[80px] ${skinTrouble || skinType || age ? '' : 'opacity-50 cursor-not-allowed'}`}
                    disabled={!(skinTrouble || skinType || age)}
                  >
                    <Search size={18} className="mr-2" />
                    検索
                  </button>
                  <button
                    type="button"
                    className="btn-506D7D flex justify-center items-center rounded-md h-[40px] w-[80px]"
                    onClick={resetForm}
                  >
                    リセット
                  </button>
                </div>
              </div>
            </form>
          </div>
          {renderProductReviews()}
        </div>
      </>
    ) : null
  );
}