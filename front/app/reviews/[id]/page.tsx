"use client";
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation'
import { User, Review, FavoriteCosmetic, ProductReviews, ApiResponse } from './review.type';
import axios from 'axios';
import Image from 'next/image';
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation';
import { PencilLine, Trash, Star } from 'lucide-react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import CustomButton from '@/components/ui/custom-button';
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
    const fetchReview = async () => {
      try {
        const response = await axios.get<Review>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews/${reviewId}`, {
          headers: headers,
          withCredentials: true
        });
        console.log(response.data);
        setReview(response.data);
      } catch (error) {
        console.error("レビューの取得中にエラーが発生しました:", error);
      }
    };

    fetchReview();
  }, [reviewId, headers]);

  function truncateName(name: string, maxLength: number = 36): string {
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
    setIsDeleteDialogOpen(true);
  };

  const removeReview = async (reviewId: number) => {
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

  return (
    session ? (
      <div className='flex flex-col space-y-4 p-10'>
        <h1 className='text-2xl md:text-3xl'>レビュー詳細</h1>
        <div className='flex flex-col items-center p-10'>
          {productReviews.map((productReview) => (
            <div key={productReview.id} className="w-full max-w-4xl">
              <div className="flex items-center justify-center h-[150px] mt-4">
                <Image src={productReview.image_url} alt="Image" width={128} height={128} objectFit="contain" quality={100} />
              </div>
              <h2 className="text-lg">{truncateName(productReview.reviews[0]?.title ?? 'タイトル不明')}</h2>
              <p>{productReview.price}円</p>
              <p>平均評価: ★ {productReview.averageRating.toFixed(1)} ({productReview.reviewCount}件)</p>
              <Accordion type="single" collapsible className="mt-4">
                {productReview.reviews.map((review) => (
                  <AccordionItem key={review.id} value={`details-${review.id}`}>
                    <AccordionTrigger>投稿者: {review.userName}さん {ratingToStars(review.rating)}</AccordionTrigger>
                    <AccordionContent>
                      <p className='text-base text-left pb-6'>{review.body}</p>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div className="tags flex space-x-2 mb-4 sm:mb-0">
                          <span className="tag bg-F5F5F5 text-48352F border border-506D7D rounded-full px-3 py-1 text-sm"> {review.skin_type} </span>
                          <span className="tag bg-F5F5F5 text-48352F border border-506D7D rounded-full px-3 py-1 text-sm"> {review.skin_trouble} </span>
                          <span className="tag bg-F5F5F5 text-48352F border border-506D7D rounded-full px-3 py-1 text-sm"> {review.age} </span>
                        </div>
                        <div className="ml-auto flex space-x-2">
                          <button onClick={() => shareOnTwitter(review)}>
                            <FontAwesomeIcon icon={faXTwitter} size="xl" className='pb-2 pl-2' />
                          </button>
                          <div className="item-right">
                            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                              <DialogTrigger asChild>
                                <button onClick={() => openEditModal(review)}>
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
                                <button onClick={() => confirmDelete(review.id)}>
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
                      </div>
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