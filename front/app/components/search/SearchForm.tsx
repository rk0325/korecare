'use client';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { getSession } from 'next-auth/react'
import { CosmeticsContext, CosmeticSet, ApiResponse } from '../../contexts/CosmeticsContext';
import { LoadingContext } from '../../contexts/LoadingContext';
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

const SearchForm = () => {
  const [skinType, setSkinType] = useState("");
  const [skinTrouble, setSkinTrouble] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const { setCosmetics, setCosmeticSets } = useContext(CosmeticsContext);
  const { setIsLoading } = useContext(LoadingContext);
  const router = useRouter()
  const [productType, setProductType] = useState('');
  const isSetSelected = productType === '化粧水・美容液・クリームセット';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    setCosmetics([]);
    setCosmeticSets([]);

    const session = await getSession();
    const token = session?.accessToken;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const UserData = {
      skin_type: skinType,
      skin_trouble: skinTrouble,
      price_range: priceRange,
      product_type: productType,
    };

    type Cosmetic = {
      id: any;
      name: any;
      itemName: any;
      itemPrice: any;
      mediumImageUrl: any;
      itemUrl: any;
      item_url: any;
      shopName: any;
      category: any;
      image_url: any;
      item_code: any;
      brand: any;
      price: any;
      lotion?: string;
      serum?: string;
      cream?: string;
      total_price?: number;
    };

    try {
      const response = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cosmetics_recommendation/search_cosmetics_for_logged_in_users`, UserData, {
        headers: headers,
        withCredentials: true
      });

      if (productType === '化粧水・美容液・クリームセット') {
        // セット商品の情報を処理
        const cosmeticSets: CosmeticSet[] = response.data.map((set: any): CosmeticSet => ({
          lotion: set.lotion,
          serum: set.serum,
          cream: set.cream,
          total_price: set.total_price
        }));
        setCosmeticSets(cosmeticSets);
      } else {
        // 単品商品の情報を処理
        const cosmetics: Cosmetic[] = response.data.map((item: any): Cosmetic => ({
          id: item.id,
          name: item.name,
          itemName: item.itemName,
          itemPrice: item.itemPrice,
          mediumImageUrl: item.mediumImageUrl,
          itemUrl: item.itemUrl,
          item_url: item.itemUrl,
          shopName: item.shopName,
          category: item.category,
          image_url: item.image_url,
          item_code: item.item_code,
          brand: item.brand,
          price: item.price,
        }));
        setCosmetics(cosmetics);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center pt-8'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col md:flex-row md:space-x-4 space-y-8 md:space-y-0'>
          <Select onValueChange={value => setSkinType(value)}>
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
          <Select onValueChange={value => setSkinTrouble(value)}>
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
          <Select value={productType} onValueChange={value => setProductType(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue className="text-text-color" placeholder="形態" />
            </SelectTrigger>
            <SelectContent className="text-text-color">
              <SelectItem value="化粧水単品">化粧水単品</SelectItem>
              <SelectItem value="美容液単品">美容液単品</SelectItem>
              <SelectItem value="クリーム単品">クリーム単品</SelectItem>
              <SelectItem value="化粧水・美容液・クリームセット">化粧水・美容液・クリームセット</SelectItem>
            </SelectContent>
          </Select>
          <Select disabled={isSetSelected} onValueChange={value => setPriceRange(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue className="text-text-color" placeholder="金額" />
            </SelectTrigger>
            <SelectContent className="text-text-color">
              <SelectItem value="〜3,000円以内">〜3,000円以内</SelectItem>
              <SelectItem value="3,001円〜5,000円以内">3,001円〜5,000円以内</SelectItem>
              <SelectItem value="5,001円〜10,000円以内">5,001円〜10,000円以内</SelectItem>
              <SelectItem value="10,001円以上">10,001円以上</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex justify-center md:flex-row md:space-x-10">
            <button type="submit" className="btn-506D7D flex justify-center items-center rounded-md h-[40px] w-[80px]" onClick={() => router.push('/search_result')}>
              <Search size={18} className="mr-2" />
              検索
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;