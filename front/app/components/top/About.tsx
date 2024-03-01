'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import CustomButton from '@/components/ui/custom-button';
import CarouselContents from './CarouselContents';
import Motion from '../../components/motionWrapper/MotionWrapper';

const About = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loginButtonImage, setLoginButtonImage] = useState('/btn_login_base.png');
  const handleLogin = async () => {
    toast.loading('ログインしています...');
    signIn('line', { callbackUrl: '/home' })
      .catch(() => {
        toast.error('ログインに失敗しました');
      });
  };

  useEffect(() => {
    if (status === 'authenticated') {
      router.push("/home");
    }
  }, [status, router]);

  if (status === "loading" || status === 'authenticated')
    return (
      <div className="text-xl text-text-color bg-background-color min-h-screen w-full flex justify-center items-center">
        <div>Loading...<br /><br />잠깐만요.</div>
      </div>
    );

  return (
    <>
      <Motion>
        <div className="flex justify-center pt-6">
          <Image
            src="/Logo.png"
            alt="LOGO"
            width={320}
            height={320}
            priority
          />
        </div>
        <p className="text-center text-lg justify-between p-6">
          KoreCare（コリケア）は<br />
          韓国コスメに特化した<br />
          毎日のスキンケアをサポートする<br />サービスです。
        </p>
      </Motion>
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