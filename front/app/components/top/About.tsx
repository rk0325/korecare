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
  const { status } = useSession();
  const router = useRouter();
  const [loginButtonImage, setLoginButtonImage] = useState('/btn_login_base.png');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push("/home");
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [status, router]);

  useEffect(() => {
    return () => toast.dismiss();
  }, []);

  const handleLogin = async () => {
    const toastId = toast.loading('ログインしています...');
    signIn('line', { callbackUrl: '/home' })
      .catch(() => {
        toast.error('ログインに失敗しました', { id: toastId });
      });
  };

  if (status === "loading" || status === 'authenticated')
    return (
      <div className="text-xl text-text-color bg-background-color min-h-screen w-full flex justify-center items-center">
        <div>Loading...<br /><br />잠깐만요.</div>
      </div>
    );

  // スマホ表示
  if (isMobile) {
    return (
      <>
        <Motion>
          <div className="flex justify-center pt-28">
            <Image src="/Logo.png" alt="LOGO" width={320} height={320} priority />
          </div>
          <p className="text-center text-xl px-6 py-8 pb-28">
            KoreCare（コリケア）は<br />韓国コスメに特化した<br />スキンケア情報サービスです。
          </p>
        </Motion>
        <div>
          <CarouselContents />
        </div>
        <div className="text-center mt-4">
          <div className="md:w-1/2 flex flex-col items-center justify-center px-4 md:px-8 md:mt-0">
            <p className="text-md text-center pt-4 pb-2">さっそくログインする</p>
            <div
              onMouseEnter={() => setLoginButtonImage('/btn_login_hover.png')}
              onMouseLeave={() => setLoginButtonImage('/btn_login_base.png')}
              onMouseDown={() => setLoginButtonImage('/btn_login_press.png')}
              onMouseUp={() => setLoginButtonImage('/btn_login_hover.png')}
              onClick={handleLogin}
              className="cursor-pointer"
            >
              <Image src={loginButtonImage} alt="ログイン" width={160} height={40} />
            </div>
            <p className="text-md text-center justify-between pt-8 pb-2">ログインせずに検索機能を</p>
            <Link href='/first_demonstration'>
              <div className="flex justify-center pb-20 md:pb-4">
                <CustomButton colorClass="btn-506D7D">試してみる</CustomButton>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  }

  // PC表示
  return (
    <>
      <div className="flex justify-center">
        <Motion>
          <div className="flex flex-col items-center justify-center pt-6 lg:flex-row lg:py-20">
            <div className="lg:w-1/2 flex flex-col items-center justify-center px-4 lg:px-8">
              <Image src="/Logo.png" alt="LOGO" width={600} height={600} priority />
              <p className="text-center lg:text-left text-2xl px-4 lg:px-4 py-10">
                KoreCare（コリケア）は<br />韓国コスメに特化した<br />スキンケア情報サービスです。
              </p>
            </div>
            <div className="lg:w-1/2 flex flex-col items-center justify-center px-4 lg:px-8 mt-4 lg:mt-10">
              <p className="text-lg text-center pt-20 pb-2">さっそくログインする</p>
              <div
                onMouseEnter={() => setLoginButtonImage('/btn_login_hover.png')}
                onMouseLeave={() => setLoginButtonImage('/btn_login_base.png')}
                onMouseDown={() => setLoginButtonImage('/btn_login_press.png')}
                onMouseUp={() => setLoginButtonImage('/btn_login_hover.png')}
                onClick={handleLogin}
                className="cursor-pointer"
              >
                <Image src={loginButtonImage} alt="ログイン" width={160} height={40} />
              </div>
              <p className="text-lg text-center justify-between pt-12 pb-2">ログインせずに検索機能を</p>
              <Link href='/first_demonstration'>
                <div className="flex justify-center pb-4 lg:pb-20">
                  <CustomButton colorClass="btn-506D7D">試してみる</CustomButton>
                </div>
              </Link>
            </div>
          </div>
        </Motion>
      </div>
      <div className="pt-20 pb-20 lg:pb-30">
        <CarouselContents />
      </div>
    </>
  );
}

export default About;
