'use client'
import React, { useState, useEffect, useContext } from 'react';
import UserInfoContext from '../../contexts/UserInfoContext';
import Link from 'next/link'
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import CustomButton from '@/components/ui/custom-button';
import { PropagateLoader } from 'react-spinners';

type Cosmetic = {
  itemName: string;
  itemPrice: number;
  mediumImageUrl: string;
  shopName: string;
  itemUrl: string;
};

const DemonstrationResult = () => {
	const { skinType, skinTrouble } = useContext(UserInfoContext);
  const [cosmetics, setCosmetics] = useState<Cosmetic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loginButtonImage, setLoginButtonImage] = useState('/btn_login_base.png');
  const handleLogin = async () => {
    toast.loading('ログインしています...');
    signIn('line', { callbackUrl: '/home' })
      .catch(() => {
        toast.error('ログインに失敗しました');
      });
  };

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

  function truncateName(name: string, maxLength: number = 40): string {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  }

  return (
    <>
      <p className="text-lg text-center justify-between pt-10">
        {skinType && skinTrouble ?
          `${skinType} × ${skinTrouble}の方に` :
          'あなたに'}
        <br />おすすめの韓国コスメはこちら！
      </p>
      <div className='flex flex-col md:flex-row md:space-x-4 p-6 justify-center space-y-4 md:space-y-0'>
        {isLoading ? (
          <div className="flex justify-center min-h-screen">
            <PropagateLoader color="#506D7D" />
          </div>
        ) : (
          cosmetics.map((cosmetic, index) => (
            <Link key={index} href={cosmetic.itemUrl} target="_blank" rel="noopener noreferrer">
              <div className='shadow-md rounded-md overflow-hidden cursor-pointer max-w-sm'>
                <div className='flex flex-col items-center px-4 py-2 sm:py-4 relative'>
                  <p className="text-lg z-10 bg-E0DBD2 py-1 px-3 mb-2 rounded-lg">{index === 0 ? '化粧水' : index === 1 ? '美容液' : 'クリーム'}</p>
                  <div className='flex flex-col items-center px-4 py-2 sm:py-4 relative'>
                    <div className="relative z-0 pt-2 w-custom h-custom">
                      <Image
                        src={cosmetic.mediumImageUrl}
                        alt={cosmetic.itemName}
                        layout="fill"
                        objectFit="contain"
                        quality={100}
                      />
                    </div>
                  </div>
                  <p className="line-clamp-2 z-10 pt-2">{truncateName(cosmetic.itemName)}</p>
                  <p className="z-10 relative pt-2 pb-2">{cosmetic.itemPrice}円</p>
                  <CustomButton colorClass="hover:bg-E0DBD2 hover:text-text-color">詳細を見る</CustomButton>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <p className="text-md text-center justify-between pt-4">
        ログインしていただくと、<br />コスメをお気に入りに登録できます！
      </p>
      <p className="text-md text-center justify-between pt-8 pb-2">
        LINEでログインする</p>
      <div className="flex justify-center pb-4">
        <div
          onMouseEnter={() => setLoginButtonImage('/btn_login_hover.png')}
          onMouseLeave={() => setLoginButtonImage('/btn_login_base.png')}
          onMouseDown={() => setLoginButtonImage('/btn_login_press.png')}
          onMouseUp={() => setLoginButtonImage('/btn_login_hover.png')}
          onClick={handleLogin}
          className="cursor-pointer"
        >
          <Image
            src={loginButtonImage}
            alt="ログイン"
            width={160}
            height={40}
          />
        </div>
      </div>
      <Link href='/first_demonstration'>
        <div className="flex justify-center pt-4 pb-20">
          <CustomButton colorClass="btn-506D7D">もう一度診断する</CustomButton>
        </div>
      </Link>
    </>
  );
}

export default DemonstrationResult;