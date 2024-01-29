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
};

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
});

export default CosmeticsContext;