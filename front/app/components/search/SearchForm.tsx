'use client';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { getSession } from 'next-auth/react'
import { CosmeticsContext, CosmeticSet, ApiResponse } from '../../contexts/CosmeticsContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import toast from 'react-hot-toast';
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

interface SearchParams {
  skinType: string;
  skinTrouble: string;
  priceRange: string;
  productType: string;
}

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [skinType, setSkinType] = useState("");
  const [skinTrouble, setSkinTrouble] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const { setCosmetics, setCosmeticSets } = useContext(CosmeticsContext);
  const { setIsLoading } = useContext(LoadingContext);
  const [productType, setProductType] = useState('');
  const isSetSelected = productType === '化粧水・美容液・クリームセット';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!skinTrouble) {
      toast.error('お悩みを選択してください');
      return;
    }

    setIsLoading(true);

    setCosmetics([]);
    setCosmeticSets([]);
    onSearch({ skinType, skinTrouble, priceRange, productType });

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
      const response = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/search_cosmetics/for_logged_in_users`, UserData, {
        headers: headers,
        withCredentials: true
      });

      if (productType === '化粧水・美容液・クリームセット') {
        const cosmeticSets: CosmeticSet[] = response.data.map((set: any): CosmeticSet => ({
          lotion: set.lotion,
          serum: set.serum,
          cream: set.cream,
          total_price: set.total_price
        }));
        setCosmeticSets(cosmeticSets);
      } else {
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

  const resetForm = () => {
    setSkinType("");
    setSkinTrouble("");
    setPriceRange("");
    setProductType("");
  };

  return (
    <div className='flex justify-center pt-8'>
      <form onSubmit={handleSubmit}>
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
          <Select value={priceRange} onValueChange={value => setPriceRange(value)} disabled={isSetSelected}>
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
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <button
              type="submit"
              className={`btn-506D7D flex justify-center items-center rounded-md h-[40px] w-[80px] ${!skinTrouble || !productType ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!skinTrouble || !productType}
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
  );
}

export default SearchForm;