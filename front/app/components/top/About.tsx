'use client';
import React, { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import CustomButton from '@/components/ui/custom-button';
import CarouselContents from './CarouselContents';

const About = () => {
  const [loginButtonImage, setLoginButtonImage] = useState('/btn_login_base.png');
  const handleLogin = async () => {
    toast.loading('ログインしています...');
    signIn('google', { callbackUrl: '/home' })
      .then(() => {
        toast.success('ログインに成功しました');
      })
      .catch(() => {
        toast.error('ログインに失敗しました');
      });
  };

  return (
    <>
      <div className="flex justify-center pt-6">
        <Image
          src="/Logo.png"
          alt="LOGO"
          width={320}
          height={320}
          priority
        />
      </div>
      <p className="text-center justify-between p-6">
        KoreCare（コリケア）は<br />
        韓国コスメに特化した<br />
        毎日のスキンケアをサポートする<br />サービスです。<br />
      </p>
      <CarouselContents />
      <p className="text-md text-center justify-between pt-10 pb-2">
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
      <p className="text-md text-center justify-between pt-4">
        2つの質問に答えるだけ！</p>
      <p className="text-md text-center justify-between pb-2">
        ログインせずにレコメンド機能を</p>
      <Link href='/first_demonstration'>
        <div className="flex justify-center pb-20">
          <CustomButton colorClass="btn-506D7D">試してみる</CustomButton>
        </div>
      </Link>
    </>
  );
}

export default About;