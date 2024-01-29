'use client';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { CosmeticsContext, Cosmetic } from '../contexts/CosmeticsContext';
import { useSession } from 'next-auth/react';

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
  const { data: session } = useSession();
  const token = session?.accessToken;
  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  useEffect(() => {
    const fetchCosmetics = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/favorite_cosmetics`, {
          headers: headers,
          withCredentials: true
        });
        setCosmetics(response.data);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };

    fetchCosmetics();
  }, [token, headers]);

  return (
    <CosmeticsContext.Provider value={{ skinType, setSkinType, skinTrouble, setSkinTrouble, priceRange, setPriceRange, productType, setProductType, cosmetics, setCosmetics }}>
      {children}
    </CosmeticsContext.Provider>
  );
};