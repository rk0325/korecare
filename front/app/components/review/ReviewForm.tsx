'use client';
import React, { useState, useMemo, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';
import { useProfile } from '../../hooks/useProfile';
import axios from 'axios';
import CosmeticsContext from '../../contexts/CosmeticsContext';
import CustomButton from '@/components/ui/custom-button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import toast from 'react-hot-toast';
import {
  Star,
} from "lucide-react"

const ReviewForm: React.FC = () => {
  const { selectedProductName, favoriteCosmeticId } = useContext(CosmeticsContext);
  const { data: session } = useSession();
  const token = session?.accessToken;
  const router = useRouter();
  const [rating, setRating] = useState<number | undefined>(undefined);
  const { profile } = useProfile() || { skin_type: '', skin_trouble: '', age: '', id: undefined };
  const MAX_RATING_STARS = 5;
  const DECIMAL_BASE = 10;
  const safeRating = rating ?? 0;

  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const [reviewForm, setReviewForm] = useState({
    title: '',
    body: '',
    visibility: true,
    rating: 0,
    skinType: '',
    skinTrouble: '',
    age: '',
  });

  useEffect(() => {
    setReviewForm(prevForm => ({
      ...prevForm,
      title: selectedProductName,
    }));
  }, [selectedProductName]);

  const handleRating = (rate: number) => {
    setRating(rate);
    setReviewForm({ ...reviewForm, rating: rate });
  };

  const renderRating = () => {
    let stars = [];
    for (let i = 1; i <= MAX_RATING_STARS; i++) {
      stars.push(
        <Star
          key={i}
          fill={i <= safeRating ? "orange" : "none"}
          stroke={i <= safeRating ? "orange" : "grey"}
          onClick={() => handleRating(i)}
          style={{ cursor: 'pointer', margin: '0 2px' }}
        />
      );
    }
    return <div style={{ display: 'flex' }}>{stars}</div>;
  };

  useEffect(() => {
    const { skin_type, skin_trouble, age } = profile;
    setReviewForm(prevForm => ({
      ...prevForm,
      skinType: skin_type,
      skinTrouble: skin_trouble,
      age: age.toString(),
    }));
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReviewForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    const visibilityBoolean = value === 'true';
    setReviewForm(prevForm => ({ ...prevForm, visibility: visibilityBoolean }));
  };

  const validateForm = () => {
    if (!reviewForm.body.trim()) {
      toast.error("レビュー本文を入力してください");
      return false;
    }
    if (reviewForm.rating === 0) {
      toast.error("評価を選択してください");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    await postReview();
  };

  const postReview = async () => {
    try {
      const formattedData = {
        review: {
          profile_id: profile.id,
          favorite_cosmetic_id: favoriteCosmeticId,
          title: reviewForm.title,
          body: reviewForm.body,
          visibility: reviewForm.visibility,
          rating: reviewForm.rating,
          age: parseInt(reviewForm.age, DECIMAL_BASE),
          skin_type: reviewForm.skinType,
          skin_trouble: reviewForm.skinTrouble,
        },
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews`, formattedData, {
        headers: headers,
        withCredentials: true,
      });
      console.log(response.data);
      router.push('/reviews')
      toast.success("レビューを投稿しました");
    } catch (error) {
      console.error(error);
      toast.error("レビューの投稿に失敗しました");
    }
  };

  if (!profile || profile.id === undefined) {
    return <div>プロフィールを設定してください。</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="grid gap-4 py-4 pt-10 font-genjyuu text-text-color pr-8 pl-8">
          <Label htmlFor="title">商品名</Label>
          <Input id="productName" name="productName" value={selectedProductName} readOnly />
          <Label htmlFor="body">レビュー本文</Label>
          <Input id="body" name="body" value={reviewForm.body} onChange={handleInputChange} />
          <div>
            <div className='pb-2'>評価</div>
            {renderRating()}
          </div>
          <div>公開設定</div>
          <RadioGroup defaultValue={reviewForm.visibility ? 'true' : 'false'} onValueChange={handleRadioChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="r1" />
              <Label htmlFor="r1">公開</Label>
              <RadioGroupItem value="false" id="r2" />
              <Label htmlFor="r2">非公開</Label>
            </div>
          </RadioGroup>
          <div>タグ設定</div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="skinType">肌質</Label>
              <Input id="skinType" name="skinType" value={reviewForm.skinType} readOnly />
            </div>
            <div>
              <Label htmlFor="skinTrouble">お悩み</Label>
              <Input id="skinTrouble" name="skinTrouble" value={reviewForm.skinTrouble} readOnly />
            </div>
            <div>
              <Label htmlFor="age">年代</Label>
              <Input id="age" name="age" value={reviewForm.age} readOnly />
            </div>
          </div>
          <CustomButton colorClass='btn-506D7D mx-auto w-[100px] mt-10'>投稿する</CustomButton>
        </div>
      </form>
    </>
  );
}

export default ReviewForm;