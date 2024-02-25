'use client';
import { createContext, Dispatch, SetStateAction } from 'react';

export type Cosmetic = {
  id: string;
  name: string;
  itemName: string;
  itemPrice: number;
  mediumImageUrl: string;
  itemUrl: string;
  shopName: string;
  isFavorite?: boolean;
  category: string;
  image_url: string;
  item_code: string;
  brand: string;
  price: string;
  item_url: string;
  lotion?: string;
  serum?: string;
  cream?: string;
};

export type CosmeticSet = {
  lotion: Cosmetic;
  serum: Cosmetic;
  cream: Cosmetic;
};

export type ApiResponseItem = {
  lotion: Cosmetic;
  serum: Cosmetic;
  cream: Cosmetic;
};

export type ApiResponse = ApiResponseItem[];

type CosmeticsContextType = {
  skinType: string;
  setSkinType: (value: string) => void;
  skinTrouble: string;
  setSkinTrouble: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
  productType: string;
  setProductType: (value: string) => void;
  cosmetics: Cosmetic[];
  setCosmetics: Dispatch<SetStateAction<Cosmetic[]>>;
  cosmeticSets: CosmeticSet[];
  setCosmeticSets: Dispatch<SetStateAction<CosmeticSet[]>>;
};

export const CosmeticsContext = createContext<CosmeticsContextType>({
  skinType: "",
  setSkinType: () => {},
  skinTrouble: "",
  setSkinTrouble: () => {},
  priceRange: "",
  setPriceRange: () => {},
  productType: "",
  setProductType: () => {},
  cosmetics: [],
  setCosmetics: () => {},
  cosmeticSets: [],
  setCosmeticSets: () => {},
});

export default CosmeticsContext;