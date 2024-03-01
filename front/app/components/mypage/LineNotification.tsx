'use client';
import React from 'react';
import {
  Sun,
  CheckSquare2,
}
from "lucide-react"

export const LineNotification = () => {
  return (
    <div className='items-center'>
      <div className="text-xl text-center flex justify-center">
        <span id="line-notification">LINE通知を受け取ろう！</span>
      </div>
      <div className="flex items-start pt-8 text-lg">
        <Sun className="mr-2 h-6 w-6" />
        <span className='marked-text'>紫外線 / 乾燥注意通知</span><br />
      </div>
      <p className='pt-4 pb-4'>お住まいをもとに、毎朝10時にUV指数と湿度の情報をお届けします。</p>
      <div>
        <div className="flex items-start pt-8 text-lg">
          <CheckSquare2 className="mr-2 h-6 w-6" />
          <span className='marked-text'>通知の設定方法</span>
        </div>
        <p className='pt-2'><a href="https://liff.line.me/1645278921-kWRPP32q/?accountId=577suiot" target="_blank" rel="noopener noreferrer" className="underline">こちら</a>から、KoreCare公式アカウントを友だち追加してね！</p>
      </div>
    </div>
  );
}

export default LineNotification;