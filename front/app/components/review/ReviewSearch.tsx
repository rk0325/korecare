'use client';
import React, { useState, useContext, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { LoadingContext } from '../../contexts/LoadingContext';
import { ReviewSearchFormProps, Review, ProductReviews } from '../../types/index';
import { SyncLoader } from 'react-spinners';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import CustomButton from '@/components/ui/custom-button';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
} from "lucide-react"

const ReviewSearchForm: React.FC<ReviewSearchFormProps> = () => {
  const router = useRouter();
  const [skinType, setSkinType] = useState("");
  const [skinTrouble, setSkinTrouble] = useState("");
  const [age, setAge] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [productReviews, setProductReviews] = useState<ProductReviews[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { data: session } = useSession();
  const token = session?.accessToken;
  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setIsSearching(true);
    setSearchPerformed(true);

    const tags = [];
    if (skinType) tags.push(skinType);
    if (skinTrouble) tags.push(skinTrouble);
    if (age) tags.push(age);

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews`, {
      headers: headers,
      withCredentials: true,
      params: {
        tags: tags.join(','),
      },
    });

    setReviews(response.data);
    setIsLoading(false);
    setIsSearching(false);
  }

  const resetForm = () => {
    setSkinType("");
    setSkinTrouble("");
    setAge("");
    setSearchPerformed(false);
  };

  function truncateName(name: string, maxLength: number = 40): string {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-3xl'>
        <form onSubmit={handleSubmit} className='w-full'>
          <div className='flex flex-col md:flex-row md:space-x-4 space-y-8 md:space-y-0'>
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
                className={`btn-506D7D flex justify-center items-center rounded-md h-[40px] w-[80px] ${skinTrouble || skinType || age || isSearching ? '' : 'opacity-50 cursor-not-allowed'}`}
                disabled={!(skinTrouble || skinType || age || isSearching)}
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
        {isLoading && (
          <div className="flex justify-center items-center pt-20">
            <SyncLoader color='#506D7D' />
          </div>
        )}
        {!isLoading && searchPerformed && reviews.length === 0 && (
          <div className='flex justify-center items-center text-center text-xl w-full py-20'>
            検索結果がありません
          </div>
        )}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
        {productReviews.map((productReview) => (
          productReview.reviews.map((review) => (
            <div key={productReview.id} className="shadow-md rounded-md overflow-hidden max-w-sm mx-auto">
              {productReview.image_url && (
                <div className="flex items-center justify-center h-[150px] mt-4">
                  <Image src={productReview.image_url || '/image.png'} alt="Image" width={128} height={128} objectFit="contain" quality={100} />
                </div>
              )}
              <div className="p-4 text-center">
                <h3 className="text-lg">{truncateName(productReview.reviews[0].title)}</h3>
                <p>{`★ ${productReview.averageRating.toFixed(1)} (${productReview.reviewCount}件)`}</p>
                <p>{productReview.price}円</p>
                <div className="flex justify-center mt-2">
                  <CustomButton
                    colorClass="hover:bg-E0DBD2 hover:text-text-color"
                    onClick={() => router.push(`/reviews/${review.id}`)}
                  >
                    レビュー詳細へ
                  </CustomButton>
                </div>
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
}

export default ReviewSearchForm;