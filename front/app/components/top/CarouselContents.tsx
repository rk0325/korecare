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
      <Carousel className="mx-auto w-4/5 md:w-1/2 max-w-screen-xl shadow-lg">
        <CarouselContent>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center p-2">
                <p className="text-text-color text-center text-xl mb-2 marked-text">KoreCareでできること</p>
                <p className="text-text-color text-center pb-4">お悩みや肌質別に韓国コスメを検索。</p>
                <p className="text-text-color text-center text-sm pb-1">あなたにピッタリの韓国コスメを探そう！</p>
                <Image src="/recommend.png" alt="Image" width={200} height={200} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-text-color text-center text-xl mb-2 mt-4 marked-text">KoreCareでできること</p>
                <p className="text-text-color text-center pb-4">紫外線や乾燥から、あなたのお肌を守るサポートをします。</p>
                <p className="text-text-color text-center text-sm pb-1">毎日LINEで天気情報をお届け！</p>
                <Image src="/line_1.png" alt="Image" width={200} height={200} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center pb-1'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-text-color text-center text-xl mb-2 mt-4 marked-text">KoreCareでできること</p>
                <p className="text-text-color text-center pb-4">スキンケアコスメの使用期限切れを防ぐサポートをします。</p>
                <p className="text-text-color text-center text-sm pb-1">LINEで替え時をお知らせ！</p>
                <Image src="/line_2.png" alt="Image" width={200} height={200} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-text-color text-center text-xl mb-2 mt-4 marked-text">他にはどんな機能があるの？</p>
                <p className="text-text-color text-center pb-4">これいいな！と思ったら<br />お気に入りに登録。</p>
                <p className="text-text-color text-center text-sm pb-1">Xで共有しよう！</p>
                <Image src="/review_1.png" alt="Image" width={200} height={200} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-text-color text-center text-xl mb-2 mt-4 marked-text">レビューを書こう！</p>
                <p className="text-text-color text-center pb-4">肌質やお悩みで<br />レビューを検索できるよ。</p>
                <p className="text-text-color text-center text-sm pb-1">感想をみんなにシェアしよう！</p>
                <Image src="/review_2.png" alt="Image" width={200} height={200} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-text-color text-center text-xl mb-2 mt-4 marked-text">韓国コスメの使い方は？</p>
                <p className="text-text-color text-center pb-4">韓国コスメの疑問にお答えします。</p>
                <p className="text-text-color text-center text-sm pb-1">随時更新中！</p>
                <Image src="/qa.png" alt="Image" width={200} height={200} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-text-color text-center text-xl mb-2 mt-4 marked-text">さっそく使ってみよう！</p>
                <p className="text-text-color text-center pt-4">KoreCareで</p>
                <p className="text-text-color text-center">より幸せな</p>
                <p className="text-text-color text-center pb-4">スキンケアライフを…✨</p>
                <p className="text-text-color text-center">읽어주셔서 감사합니다.</p>
                <p className="text-text-color text-center text-sm">読んでいただき<br />ありがとうございました！</p>
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