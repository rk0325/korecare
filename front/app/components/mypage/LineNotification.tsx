'use client';
import React from 'react';
import {
  Sun,
  CheckSquare2,
  Hourglass
}
from "lucide-react"

export const LineNotification = () => {
  return (
    <>
      <div className="flex items-start text-lg">
        <Sun className="mr-2 h-6 w-6" />
        <span className='marked-text'>紫外線 / 乾燥注意通知</span>
      </div>
      <p className='pt-2'>お住まいをもとに、毎朝10時にUV指数と湿度の情報をお届けします。</p>
      <div className="flex items-start pt-6 text-lg">
        <Hourglass className="mr-2 h-6 w-6" />
        <span className='marked-text'>使用期限通知</span>
      </div>
      <p className='pt-2'>開封日・使用期限をもとに、スキンケアコスメの替え時を通知します。</p>
      <div>
        <div className="flex items-start pt-6 text-lg">
          <CheckSquare2 className="mr-2 h-6 w-6" />
          <span className='marked-text'>通知の設定方法</span>
        </div>
        <p className='pt-2'>（1）「紫外線 / 乾燥注意通知」の場合はお住まいを設定、「使用期限通知」の場合は製品タイプ・開封日・使用期限を設定（3アイテムまで設定できます）</p>
        <p className='pt-2'>（2）<a href="https://liff.line.me/1645278921-kWRPP32q/?accountId=577suiot" target="_blank" rel="noopener noreferrer" className="underline">こちら</a>から、KoreCare公式アカウントを友だちへ追加</p>
        <p className='pt-2'>（3）「通知を受け取る」をON！
        </p>
      </div>
    </>
  );
}

export default LineNotification;