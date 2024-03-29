'use client';
import React, { useState } from 'react';
import { CosmeticsContext, Cosmetic, CosmeticSet } from '../contexts/CosmeticsContext';

export default function CosmeticsContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [skinType, setSkinType] = useState("");
  const [skinTrouble, setSkinTrouble] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [productType, setProductType] = useState("");
  const [cosmetics, setCosmetics] = useState<Cosmetic[]>([]);
  const [cosmeticSets, setCosmeticSets] = useState<CosmeticSet[]>([]);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [favoriteCosmeticId, setFavoriteCosmeticId] = useState("");

  return (
    <CosmeticsContext.Provider value={{ skinType, setSkinType, skinTrouble, setSkinTrouble, priceRange, setPriceRange, productType, setProductType, cosmetics, setCosmetics, cosmeticSets, setCosmeticSets, selectedProductName, setSelectedProductName, favoriteCosmeticId, setFavoriteCosmeticId }}>
      {children}
    </CosmeticsContext.Provider>
  );
};