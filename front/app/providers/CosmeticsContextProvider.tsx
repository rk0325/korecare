'use client';
import React, { useState } from 'react';
import { CosmeticsContext, Cosmetic } from '../contexts/CosmeticsContext';

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

  return (
    <CosmeticsContext.Provider value={{ skinType, setSkinType, skinTrouble, setSkinTrouble, priceRange, setPriceRange, productType, setProductType, cosmetics, setCosmetics }}>
      {children}
    </CosmeticsContext.Provider>
  );
};