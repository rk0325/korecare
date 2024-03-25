"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation'
import { Review, ProductReviews } from './review.type';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation';
import { PencilLine, Trash, Star } from 'lucide-react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import CustomButton from '@/components/ui/custom-button';
import { SyncLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import toast from 'react-hot-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export default function ReviewDetails() {
  const router = useRouter()
  const { data: session } = useSession();
  const params = useParams<{ id: string; }>()
  const reviewId = params.id;
  const [productReviews, setProductReviews] = useState<ProductReviews[]>([]);
  const token = session?.accessToken;
  const [review, setReview] = useState<Review | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingReviewId, setDeletingReviewId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  function ratingToNumber(rating: string): number {
    const ratingsMap = { very_bad: 1, bad: 2, medium: 3, good: 4, very_good: 5 };
    return ratingsMap[rating as keyof typeof ratingsMap] || 0;
  }

  function numberToRatingKey(ratingNumber: number): string {
    const ratingsMap: { [key: string]: string } = {
      '1': 'very_bad',
      '2': 'bad',
      '3': 'medium',
      '4': 'good',
      '5': 'very_good'
    };
    return ratingsMap[ratingNumber.toString()] || 'medium';
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchReviewDetails = async () => {
      try {
        const reviewResponse = await axios.get<Review>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews/${reviewId}`, {
          headers: headers,
          withCredentials: true
        });
        setReview(reviewResponse.data);

        const itemCode = reviewResponse.data.favorite_cosmetic.item_code;

        const productReviewsResponse = await axios.get<ProductReviews[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews?item_code=${itemCode}`, {
          headers: headers,
          withCredentials: true
        });

        const reviews = productReviewsResponse.data;
        const totalRating = reviews.reduce((acc, review) => acc + ratingToNumber(review.rating), 0);
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
        const reviewCount = reviews.length;

        const updatedProductReviewsWithInfo = reviews.map(review => ({
          ...review,
          averageRating: isNaN(averageRating) ? 0 : averageRating,
          reviewCount: reviewCount,
        }));

        setProductReviews(updatedProductReviewsWithInfo);
      } catch (error) {
        console.error("データ取得失敗:", error);
      }
      setIsLoading(false);
    };

    fetchReviewDetails();
  }, [headers, reviewId]);

  function truncateName(name: string, maxLength: number = 38): string {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  }

  function ratingToStars(rating: string) {
    const ratingsMap = { very_bad: 1, bad: 2, medium: 3, good: 4, very_good: 5 };
    const ratingNumber = ratingsMap[rating as keyof typeof ratingsMap] || 0;
    return "★".repeat(ratingNumber);
  }

  const numberToRatingString = (rating: number): string => {
    return rating.toString();
  };

  function openEditModal(review: Review) {
    setEditingReview(review);
    setIsEditModalOpen(true);
  }

  const confirmDelete = (reviewId: number) => {
    setDeletingReviewId(reviewId);
    console.log(reviewId);
    setIsDeleteDialogOpen(true);
  };

  const removeReview = async (reviewId: number) => {
    console.log(reviewId);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews/${reviewId}`, {
        headers: headers,
        withCredentials: true,
      });
      setReviews(reviews.filter(review => review.id !== reviewId));
      router.push('/reviews');
      toast.success('レビューを削除しました');
    } catch (error) {
      console.error('レビューの削除に失敗しました:', error);
      toast.error('レビューの削除に失敗しました');
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingReview) return;

    const ratingKey = numberToRatingKey(parseInt(editingReview.rating));

    try {
      const { user, userName, id, ...reviewDataToUpdate } = editingReview;
      const updatedReviewData = {
        review: {
          ...reviewDataToUpdate,
          rating: ratingKey,
        },
      };

      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews/${editingReview.id}`, updatedReviewData, {
        headers: headers,
        withCredentials: true,
      });

      const updatedReviews = reviews.map((review) => review.id === editingReview.id ? { ...review, ...updatedReviewData.review } : review);
      setReviews(updatedReviews);
      router.push('/reviews');
      toast.success('レビューを更新しました');
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('レビューの更新に失敗しました:', error);
      toast.error('レビューの更新に失敗しました');
    }
  };

  const renderRatingStars = (rating: string) => {
    let stars = [];
    const numericRating = parseInt(rating, 10);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          fill={i <= numericRating ? "orange" : "none"}
          stroke={i <= numericRating ? "orange" : "grey"}
          onClick={() => {
            if (editingReview) {
              setEditingReview({
                ...editingReview,
                rating: numberToRatingString(i),
              });
            }
          }}
          style={{ cursor: 'pointer', margin: '0 2px' }}
        />
      );
    }
    return <div style={{ display: 'flex' }}>{stars}</div>;
  };

  function shareOnTwitter(review: Review) {
    const text = `レビューを投稿しました！ #KoreCare`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=https://korecare.jp`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const productInfo = productReviews[0]?.favorite_cosmetic;
  const averageRating = productReviews[0]?.averageRating;
  const reviewCount = productReviews.length;

  return (
    session ? (
      <>
        {isLoading ? (
          <div className="flex justify-center pt-20">
            <SyncLoader color="#506D7D" />
          </div>
        ) : (
          <div className='flex flex-col space-y-4 p-10'>
            <h1 className='text-2xl md:text-3xl'>レビュー詳細</h1>
            <div className='flex flex-col items-center pt-10'>
              <div className="relative h-[150px] w-full max-w-4xl mb-4">
                <Image src={productInfo?.image_url} alt="Image" layout="fill" objectFit="contain" quality={100} />
              </div>
              <h2 className="text-lg">{truncateName(productInfo?.name ?? '無題')}</h2>
              <p>{productInfo?.price}円</p>
              <p>平均評価: {typeof averageRating === 'number' ? averageRating.toFixed(1) : 'N/A'} ({reviewCount}件)</p>
              <Accordion type="single" collapsible className="mt-4 md:w-1/3">
                {productReviews.map((productReview) => (
                  <AccordionItem key={productReview.id} value={`details-${productReview.id}`}>
                    <AccordionTrigger>投稿者: {productReview.user_name}さん {ratingToStars(productReview.rating)}</AccordionTrigger>
                    <AccordionContent>
                      <p className='text-base text-left pb-6'>{productReview.body}</p>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="tags flex space-x-2 mb-4 sm:mb-0">
                          {productReview.skin_type && (
                            <span className="tag bg-F5F5F5 text-48352F border border-506D7D rounded-full px-3 py-1 text-sm">
                              {productReview.skin_type}
                            </span>
                          )}
                          {productReview.skin_trouble && (
                            <span className="tag bg-F5F5F5 text-48352F border border-506D7D rounded-full px-3 py-1 text-sm">
                              {productReview.skin_trouble}
                            </span>
                          )}
                          {productReview.age && (
                            <span className="tag bg-F5F5F5 text-48352F border border-506D7D rounded-full px-3 py-1 text-sm">
                              {productReview.age}
                            </span>
                          )}
                        </div>
                        {session?.user?.id === productReview.user.uid && (
                          <div className="ml-auto flex space-x-2">
                            <button onClick={() => review && shareOnTwitter(review)}>
                              <FontAwesomeIcon icon={faXTwitter} size="xl" className='pb-2 pl-2' />
                            </button>
                            <div className="item-right">
                              <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                                <DialogTrigger asChild>
                                  <button onClick={() => review && openEditModal(review)}>
                                    <PencilLine className='mr-2' />
                                  </button>
                                </DialogTrigger>
                                <DialogContent className="font-genjyuu text-text-color">
                                  <DialogHeader>
                                    <DialogTitle>レビュー編集</DialogTitle>
                                  </DialogHeader>
                                  <form onSubmit={handleEditSubmit}>
                                    <div className='pb-2'>
                                      <Label htmlFor="editRating">評価</Label>
                                      {editingReview && renderRatingStars(editingReview.rating)}
                                    </div>
                                    <Label htmlFor="editBody">レビュー本文</Label>
                                    <Input
                                      id="editBody"
                                      name="body"
                                      value={editingReview?.body || ''}
                                      onChange={(e) => {
                                        if (editingReview) {
                                          setEditingReview({
                                            ...editingReview,
                                            body: e.target.value,
                                            userName: editingReview.userName || '匿名',
                                          });
                                        }
                                      }}
                                    />
                                    <DialogFooter>
                                      <CustomButton type="submit" colorClass='btn-506D7D mx-auto min-w-[100px] mt-4' onClick={() => setIsEditModalOpen(false)}>更新</CustomButton>
                                    </DialogFooter>
                                  </form>
                                </DialogContent>
                              </Dialog>
                              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                <DialogTrigger asChild>
                                  <button onClick={() => review && confirmDelete(review.id)}>
                                    <Trash />
                                  </button>
                                </DialogTrigger>
                                <DialogContent className="font-genjyuu text-text-color">
                                  <DialogHeader>
                                    <DialogTitle>本当に削除しますか？</DialogTitle>
                                  </DialogHeader>
                                  <DialogDescription className="text-text-color">
                                    この操作は元に戻せません。<br />本当にこのレビューを削除してもよろしいですか？
                                  </DialogDescription>
                                  <DialogFooter className="flex justify-center items-center pt-2">
                                    <button className="bg-F5F5F5 text-48352F hover:bg-E0DBD2 rounded-lg min-h-[40px] px-4 min-w-[60px] mr-1 mb-2" onClick={() => setIsDeleteDialogOpen(false)}>キャンセル</button>
                                    <button className="mb-2 btn-506D7D rounded-lg min-h-[40px] px-4 min-w-[60px]" onClick={() => {
                                      if (deletingReviewId !== null) removeReview(deletingReviewId);
                                      setIsDeleteDialogOpen(false);
                                    }}>削除</button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        )}
        <Link href='/reviews'>
          <CustomButton type="submit" colorClass='btn-506D7D mx-auto min-w-[100px] mt-4'>レビュー一覧に戻る</CustomButton>
        </Link>
      </>
    ) : null
  );
}