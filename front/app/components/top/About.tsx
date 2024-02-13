'use client';
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import CustomButton from '@/components/ui/custom-button';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const About = () => {
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

  const carouselTexts = [
    "『KoreCare』でできること　（1）お悩みや肌質別に韓国コスメをレコメンドします。",
    "『KoreCare』でできること　（2）お肌の大敵である紫外線や乾燥から、あなたのお肌を守るサポートをします。",
    "『KoreCare』でできること　（3）スキンケアコスメの買い忘れ・使用期限切れを防ぐサポートをします。",
    "韓国コスメが人気の理由は？",
    "韓国コスメを購入・使用する際の注意点"
  ];

  return (
    <div className='bg-background-color min-h-screen text-text-color text-center font-genjyuu'>
      <div className="flex justify-center pt-6">
        <Image
          src="/Logo.png"
          alt="LOGO"
          width={360}
          height={360}
          priority
        />
      </div>
      <p className="text-center justify-between p-10">
        『KoreCare（コリケア）』は韓国コスメに特化した、毎日のスキンケアをサポートするサービスです。<br />
      </p>
      <Carousel className="mx-auto w-3/4 max-w-2xl">
        <CarouselContent>
          {carouselTexts.map((text, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className='carousel-height-custom flex flex-col items-center justify-center'>
                  <CardContent className="flex flex-col items-center justify-center p-2">
                    {text.split('　').map((line, lineIndex) => (
                      <p key={lineIndex} className="text-md text-text-color">{line}</p>
                    ))}
                    <div className="mt-2">
                      <Image
                        src="/coming_soon.png"
                        alt="Image"
                        width={300}
                        height={300}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p className="text-md text-center justify-between pt-4">
        2つの質問に答えるだけ！</p>
      <p className="text-md text-center justify-between pb-2">
        ログインせずにレコメンド機能を</p>
      <Link href='/first_demonstration'>
        <div className="flex justify-center pb-5">
          <CustomButton colorClass="btn-506D7D">試してみる</CustomButton>
        </div>
      </Link>
      <p className="text-md text-center justify-between pt-2 pb-2">
        Googleでログインする</p>
      <div className="flex justify-center pb-10">
        <CustomButton colorClass="btn-506D7D" onClick={handleLogin}>ログイン</CustomButton>
      </div>
    </div>
  );
}

export default About;