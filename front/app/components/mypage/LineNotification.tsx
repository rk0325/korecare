'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Sun,
  CheckSquare2
}
from "lucide-react"

export const LineNotification = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  // useMemoを使用してheadersをメモ化
  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const handleSwitchChange = async (checked: boolean) => {
    setIsNotificationEnabled(checked);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/enable`,
        { enabled: checked },
        { headers: headers, withCredentials: true }
      );
    } catch (error) {
      console.error('通知設定の更新エラー:', error);
    }
  };

  useEffect(() => {
    const fetchNotificationSetting = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/status`, {
          headers: headers,
          withCredentials: true
        });
        setIsNotificationEnabled(response.data.notificationEnabled);
      } catch (error) {
        console.error('通知設定の取得エラー:', error);
      }
    };

    fetchNotificationSetting();
  }, [headers]);

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
          checked={isNotificationEnabled}
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