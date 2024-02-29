'use client';
import React from 'react';
import Image from 'next/image';
import {
  Sun,
  CheckSquare2,
  Laptop,
  Smartphone,
}
from "lucide-react"

export const LineNotification = () => {
  return (
    <div className='items-center'>
      <div className="text-3xl text-center flex justify-center">
        <span id="line-notification">LINE通知登録</span>
      </div>
      <div className="flex items-center pt-8 justify-center text-lg">
        <Sun className="mr-2 h-6 w-6" />
        <span className='marked-text'>紫外線 / 乾燥注意通知</span><br />
      </div>
      <p className='pt-4 pb-4'>お住まいをもとに、毎朝10時にUV指数と湿度の情報をお届けします。</p>
      <div className="px-1 text-center">
        <div className="flex items-center pt-4 justify-center text-lg">
          <CheckSquare2 className="mr-2 h-6 w-6" />
          <span className='marked-text'>通知の設定方法</span>
        </div>
        <div className='flex items-end justify-center'>
          <Laptop className="mr-2 h-6 w-6" />
          <p className='pt-6 marked-text'>PCの方</p>
        </div>
        <p className='pt-2'>QRコードからKoreCare公式アカウントを友だちへ追加</p>
        <div className="pt-2 flex justify-center items-center">
          <Image
            src="/LINE_QR.png"
            alt="LINE QR Code"
            width={200}
            height={200}
          />
        </div>
        <div className='flex items-end justify-center'>
          <Smartphone className="mr-1 h-6 w-6" />
          <p className='pt-6 marked-text'>スマートフォンの方</p>
        </div>
        <p className='pt-2'><a href="https://liff.line.me/1645278921-kWRPP32q/?accountId=577suiot" target="_blank" rel="noopener noreferrer" className="underline">こちら</a>をタップして、KoreCare公式アカウントを友だちへ追加</p>
      </div>
    </div>
  );
}

export default LineNotification;