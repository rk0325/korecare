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

const CarouselContents = () => {

  return (
    <>
      <Carousel className="mx-auto w-4/5 md:w-1/2 max-w-screen-xl shadow-md">
        <CarouselContent>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center p-2">
                <p className="text-text-color text-center text-lg mb-2 marked-text">KoreCareでできること</p>
                <p className="text-text-color text-center pb-4">お悩みや肌質別に韓国コスメを検索。</p>
                <p className="text-text-color text-center text-sm pb-1">あなたにピッタリの韓国コスメを探そう！</p>
                <Image src="/recommend.png" alt="Image" width={200} height={200} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-text-color text-center text-lg mb-2 mt-4 marked-text">KoreCareでできること</p>
                <p className="text-text-color text-center pb-4">お肌の大敵である紫外線や乾燥から、あなたのお肌を守るサポートをします。</p>
                <p className="text-text-color text-center text-sm pb-1">毎日LINEで天気情報をお届け！</p>
                <Image src="/line.png" alt="Image" width={200} height={200} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center pb-1'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-text-color text-center text-lg mb-2 mt-4 marked-text">KoreCareでできること</p>
                <p className="text-text-color text-center pb-4">スキンケアコスメの使用期限切れを防ぐサポートをします。</p>
                <p className="text-text-color text-center text-sm pb-1">LINEで替え時をご連絡します！</p>
                <Image src="/coming_soon.png" alt="Image" width={200} height={200} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-text-color text-center text-lg mb-2 mt-4 marked-text">韓国コスメの使い方をご紹介！</p>
                <p className="text-text-color text-center pb-4">トナー？セラム？<br />韓国コスメの基本を解説します。</p>
                <p className="text-text-color text-center text-sm pb-1">随時更新していきます！</p>
                <Image src="/column.png" alt="Image" width={200} height={200} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-text-color text-center text-lg mb-2 marked-text">他にはどんな機能があるの？</p>
                <p className="text-text-color text-center pb-1">・お気に入りコスメ登録</p>
                <p className="text-text-color text-center text-sm pb-8">いいな！と思ったコスメをお気に入りに登録したり、Xでみんなに共有しよう！</p>
                <p className="text-text-color text-center text-lg mb-2 marked-text">後日リリース予定</p>
                <p className="text-text-color text-center pb-1">・合わなかったコスメ登録</p>
                <p className="text-text-color text-center text-sm pb-4">私には合わなかったな…と思ったコスメを、どこが合わなかったのかコメントとともに記録できるよ。</p>
                <p className="text-text-color text-center pb-1">・レビュー投稿</p>
                <p className="text-text-color text-center text-sm">実際に使ってみた感想をレビューに投稿したり、他の人のレビューにいいね！やコメントをし合おう。</p>
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