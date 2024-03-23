import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Sparkles,
} from "lucide-react";

const CarouselContents = () => {
  const textCenterColor = "text-text-color text-center";

  return (
    <>
      <Carousel className="mx-auto w-4/5 md:w-1/2 max-w-screen-xl shadow-lg">
        <CarouselContent>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center p-2">
                <p className={`${textCenterColor} text-xl mb-2 marked-text`}>KoreCareでできること</p>
                <p className={`${textCenterColor} pb-4`}>お悩みや肌質別に韓国コスメを検索。</p>
                <p className={`${textCenterColor} pb-1 text-sm`}>あなたにピッタリの韓国コスメを探そう！</p>
                <Image src="/search.png" alt="Image" width={200} height={200} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className={`${textCenterColor} text-xl mb-2 marked-text mt-4`}>KoreCareでできること</p>
                <p className={`${textCenterColor} pb-4`}>紫外線や乾燥から、あなたのお肌を守るサポートをします。</p>
                <p className={`${textCenterColor} pb-1 text-sm`}>毎日LINEで天気情報をお届け！</p>
                <Image src="/line_1.png" alt="Image" width={200} height={200} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center pb-1'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className={`${textCenterColor} text-xl mb-2 marked-text mt-4`}>KoreCareでできること</p>
                <p className={`${textCenterColor} pb-4`}>スキンケアコスメの使用期限切れを防ぐサポートをします。</p>
                <p className={`${textCenterColor} pb-1 text-sm`}>LINEで替え時をお知らせ！</p>
                <Image src="/line_2.png" alt="Image" width={200} height={200} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className={`${textCenterColor} text-xl mb-2 marked-text mt-4`}>他にはどんな機能があるの？</p>
                <p className={`${textCenterColor} pb-4`}>これいいな！と思ったら<br />お気に入りに登録。</p>
                <Image src="/review_1.png" alt="Image" width={200} height={200} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className={`${textCenterColor} text-xl mb-2 marked-text mt-4`}>レビューを書こう！</p>
                <p className={`${textCenterColor} pb-4`}>感想をみんなにシェアしよう。</p>
                <Image src="/review_2.png" alt="Image" width={200} height={200} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className={`${textCenterColor} text-xl mb-2 marked-text mt-4`}>韓国コスメの使い方は？</p>
                <p className={`${textCenterColor} pb-4`}>韓国コスメの疑問にお答えします。</p>
                <Image src="/qa.png" alt="Image" width={200} height={200} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className={`${textCenterColor} text-xl mb-2 marked-text mt-4`}>さっそく使ってみよう！</p>
                <p className={`${textCenterColor} pt-4`}>KoreCareで</p>
                <p className={`${textCenterColor}`}>より幸せな</p>
                <div className="flex items-start">
                  <p className="text-text-color">スキンケアライフを…</p>
                  <Sparkles className="ml-1 h-6 w-5 text-text-color" />
                </div>
                <p className={`${textCenterColor} pt-4`}>읽어주셔서 감사합니다.</p>
                <p className={`${textCenterColor}`}>読んでいただき<br />ありがとうございました！</p>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}

export default CarouselContents;