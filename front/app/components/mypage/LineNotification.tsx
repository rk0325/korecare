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
  CheckSquare2
}
from "lucide-react"
import { useProfile } from '../../hooks/useProfile';

// axiosのインスタンスを作成
const axiosInstance = axios.create({
  withCredentials: true,
});

// axiosInstanceを使用してリクエストを行うfetcher関数を定義
const fetcher = (url: string, headers: any) => axiosInstance.get(url, { headers }).then(res => res.data);

export const LineNotification = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const { profile } = useProfile();
  const [notificationMap, setNotificationMap] = useState(new Map());
  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  // useSWRを使用して通知のオンオフ状態を取得
  const { data: notificationStatus } = useSWR<{ receive_notifications: boolean }>(
    token ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/status` : null,
    () => fetcher(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/status`, headers)
  );

  // 通知設定の初期化
  useEffect(() => {
    if (notificationStatus && typeof notificationStatus.receive_notifications === 'boolean') {
      setNotificationMap(new Map([['notification', notificationStatus.receive_notifications]]));
    }
  }, [notificationStatus]);

  console.log(notificationStatus)
  console.log(notificationMap)

  const handleSwitchChange = useCallback(async (checked: boolean) => {
    setNotificationMap(new Map(notificationMap).set('notification', checked));

    if (checked) {
      try {
        // スイッチがオンになった時、prefectureを含む通知設定をバックエンドに送信
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/enable`,
          { enabled: true, address: profile?.prefecture },
          { headers: headers, withCredentials: true }
        );
        console.log('通知設定有効化:', response.data);
      } catch (error) {
        console.error('通知設定エラー:', error);
      }
    } else {
      try {
        // スイッチがオフになった時、通知を無効化するリクエストを送信
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
  }, [notificationMap, headers, profile?.prefecture]);

  return (
    <div className='bg-background-color min-h-screen text-text-color text-center font-genjyuu items-center'>
      <Separator className="my-20" />
      <div className="text-2xl text-center flex justify-center items-center">
        <span>LINE通知登録</span>
      </div>
      <div className="flex items-center pt-8 justify-center text-lg">
        <Sun className="mr-2 h-6 w-6" />
        <span>紫外線 / 乾燥注意通知</span><br />
      </div>
      <div className="flex items-center justify-center space-x-2 pt-4">
        <Switch
          id="line-notification"
          checked={notificationMap.get('notification') ?? false}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="line-notification" className='text-md'>通知ON</Label>
      </div>
      <div className="pt-4 flex justify-center items-center">
        <Image
          src="/LINE_QR.png"
          alt="LINE QR Code"
          width={200}
          height={200}
        />
      </div>
      <div className="mt-4 px-1 text-center">
        <div className="flex items-center pt-8 justify-center text-lg">
          <CheckSquare2 className="mr-2 h-6 w-6" />
          <span>通知の設定方法</span>
        </div>
        <p>QRコードもしくは<a href="https://liff.line.me/1645278921-kWRPP32q/?accountId=577suiot" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>こちらのリンク</a>から、KoreCareの公式アカウントを友だちに追加。</p>
        <p>入力いただいたお住まいをもとに、毎朝10時にUV指数と湿度の情報をお届けします。</p>
      </div>
    </div>
  );
}

export default LineNotification;