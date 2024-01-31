'use client'
import React, { useState, useEffect, useContext } from 'react';
import UserInfoContext from '../../contexts/UserInfoContext';
import Link from 'next/link'
import CustomButton from '@/components/ui/custom-button';
import axios from 'axios';
import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton"

type Cosmetic = {
  itemName: string;
  itemPrice: number;
  mediumImageUrl: string;
};

const DemonstrationResult = () => {
	const { skinType, skinTrouble } = useContext(UserInfoContext);
  const [cosmetics, setCosmetics] = useState<Cosmetic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCosmetics = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cosmetics_recommendation/search_cosmetics_for_guests`, {
					skin_type: skinType,
					skin_trouble: skinTrouble
				});
        setCosmetics(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCosmetics();
  }, [skinType, skinTrouble]);

  return (
    <div className='bg-background-color min-h-screen text-text-color text-center font-genjyuu'>
      <p className="text-2xl font-bold text-center justify-between pt-10 p-6">
        あなたにおすすめの韓国コスメはこちら！
      </p>
      <div className='flex flex-col md:flex-row md:space-x-4 p-8 justify-center space-y-4 md:space-y-0'>
        {isLoading ? (
          // ローディング中はスケルトンカードを表示
          Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-[125px] w-[250px] rounded-xl" />)
        ) : (
          cosmetics.map((cosmetic, index) => (
            <div key={index} className='flex flex-col items-center px-4 py-2 sm:py-4'>
              <p className="text-lg">{index === 0 ? '化粧水' : index === 1 ? '美容液' : 'クリーム'}</p>
              <p className="pb-2 line-clamp-2">{cosmetic.itemName.length > 40 ? cosmetic.itemName.substring(0, 40) + '...' : cosmetic.itemName}</p>
              <Image
                src={cosmetic.mediumImageUrl}
                alt={cosmetic.itemName}
                width={500}
                height={500}
                style={{ objectFit: "contain", width: "auto" }}
              />
              <p>{cosmetic.itemPrice}円</p>
            </div>
          ))
        )}
      </div>
      <br />
      <Link href='/first_demonstration'>
        <div className="flex justify-center pb-10">
          <CustomButton colorClass="btn-506D7D">もう一度診断する</CustomButton>
        </div>
      </Link>
    </div>
  );
}

export default DemonstrationResult;