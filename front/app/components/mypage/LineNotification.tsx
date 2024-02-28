'use client';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import useSWR from 'swr';
import Image from 'next/image';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Sun,
  CheckSquare2,
  Laptop,
  Smartphone,
  ChevronsDown
}
from "lucide-react"

const axiosInstance = axios.create({
  withCredentials: true,
});

const fetcher = (url: string, headers: any) => axiosInstance.get(url, { headers }).then(res => res.data);

export const LineNotification = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const [notificationMap, setNotificationMap] = useState(new Map());
  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const { data: notificationStatus } = useSWR<{ receive_notifications: boolean }>(
    token ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/status` : null,
    () => fetcher(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/status`, headers)
  );

  useEffect(() => {
    if (notificationStatus && typeof notificationStatus.receive_notifications === 'boolean') {
      setNotificationMap(new Map([['notification', notificationStatus.receive_notifications]]));
    }
  }, [notificationStatus]);

  const handleSwitchChange = useCallback(async (checked: boolean) => {
    setNotificationMap(new Map(notificationMap).set('notification', checked));

    if (checked) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/enable`,
          { enabled: true },
          { headers: headers, withCredentials: true }
        );

        console.log('通知設定有効化完了');
      } catch (error) {
        console.error('通知設定エラー:', error);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/enable`,
          { enabled: false },
          { headers: headers, withCredentials: true }
        );
        console.log('通知設定無効化:', response.data);
      } catch (error) {
        console.error('通知無効化エラー:', error);
      }
    }
  }, [headers, notificationMap]);

  return (
    <div className='items-center'>
      <Separator className="my-10" />
      <div className="text-xl text-center flex justify-center">
        <span id="line-notification">LINE通知登録</span>
      </div>
      <div className="flex items-center pt-8 justify-center text-lg">
        <Sun className="mr-2 h-6 w-6" />
        <span className='marked-text'>紫外線 / 乾燥注意通知</span><br />
      </div>
      <p className='pt-4 pb-4'>マイページにて設定していただいたお住まいをもとに、毎朝10時にUV指数と湿度の情報をお届けします。</p>
      <div className="px-1 text-center">
        <div className="flex items-center pt-4 justify-center text-lg">
          <CheckSquare2 className="mr-2 h-6 w-6" />
          <span className='marked-text'>通知の設定方法</span>
        </div>
        <div className='flex items-end justify-center'>
          <Laptop className="mr-2 h-6 w-6" />
          <p className='pt-6 marked-text'>PCの方</p>
        </div>
        <p className='pt-2'>こちらのQRコードを読み取っていただき、KoreCare公式アカウントを友だちへ追加</p>
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
        <p className='pt-2'><a href="https://liff.line.me/1645278921-kWRPP32q/?accountId=577suiot" target="_blank" rel="noopener noreferrer" className="underline">こちらのリンク</a>から、KoreCare公式アカウントを友だちへ追加</p>
        <div className='flex justify-center pt-4'>
          <ChevronsDown className="mr-2 h-6 w-6" />
        </div>
        <div className="flex items-center justify-center space-x-2 pt-4 pb-4">
          <Switch
            id="line-notification"
            checked={notificationMap.get('notification') ?? false}
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor="line-notification" className='text-md'>通知を受け取る</Label>
        </div>
        <p className='pt-2 pb-6'>「通知を受け取る」をONにしていただいたら設定完了です！</p>
      </div>
    </div>
  );
}

export default LineNotification;