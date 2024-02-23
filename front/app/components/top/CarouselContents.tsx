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
                <p className="text-text-color text-center">KoreCareでできること</p>
                <p className="text-text-color text-center p-4">（1）お悩みや肌質別に韓国コスメをレコメンドします。</p>
                <Image src="/coming_soon.png" alt="Image" width={300} height={300} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-text-color text-center">KoreCareでできること</p>
                <p className="text-text-color text-center p-4">（2）お肌の大敵である紫外線や乾燥から、あなたのお肌を守るサポートをします。</p>
                <Image src="/coming_soon.png" alt="Image" width={300} height={300} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center p-2">
                <p className="text-text-color text-center">KoreCareでできること</p>
                <p className="text-text-color text-center p-4">（3）スキンケアコスメの使用期限切れを防ぐサポートをします。</p>
                <Image src="/coming_soon.png" alt="Image" width={300} height={300} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center p-2">
                <p className="text-text-color text-center p-4">韓国コスメが人気の理由は？</p>
                <Image src="/coming_soon.png" alt="Image" width={300} height={300} />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='carousel-height-custom flex flex-col items-center justify-center'>
              <CardContent className="flex flex-col items-center justify-center p-2">
                <p className="text-text-color text-center p-4">韓国コスメを購入・使用する際の注意点</p>
                <Image src="/coming_soon.png" alt="Image" width={300} height={300} />
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