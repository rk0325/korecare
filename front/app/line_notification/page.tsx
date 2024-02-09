'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import CustomButton from '@/components/ui/custom-button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sun,
} from "lucide-react"

const LineNotification = () => {
  const [address, setAddress] = useState('');
  const { data: session } = useSession();
  const token = session?.accessToken;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/addresses`, address, {
				headers: headers,
				withCredentials: true
      });
      console.log(response.data);
      alert('住所が送信されました');
    } catch (error) {
      console.error('送信エラー:', error);
    }
  };

  return (
    <div className='bg-background-color min-h-screen text-text-color text-center font-genjyuu items-center'>
      <div className="text-2xl text-center pt-20 flex justify-center items-center">
        <span>LINE通知登録</span>
      </div>
      <div className="flex items-center cursor-pointer pt-8 justify-center">
        <Sun className="mr-2 h-6 w-6" />
        <span>紫外線 / 乾燥注意通知</span><br />
      </div>
      <div className="grid w-full gap-1.5 p-10 justify-items-center">
        <Select onValueChange={value => setAddress(value)}>
          <SelectTrigger className="w-[280px]">
            <SelectValue className="text-text-color" placeholder="都道府県を選択" />
          </SelectTrigger>
          <SelectContent className="text-text-color">
            <SelectGroup>
              <SelectItem value="北海道">北海道</SelectItem>
              <SelectItem value="青森県">青森県</SelectItem>
              <SelectItem value="岩手県">岩手県</SelectItem>
              <SelectItem value="宮城県">宮城県</SelectItem>
              <SelectItem value="秋田県">秋田県</SelectItem>
              <SelectItem value="山形県">山形県</SelectItem>
              <SelectItem value="福島県">福島県</SelectItem>
              <SelectItem value="茨城県">茨城県</SelectItem>
              <SelectItem value="栃木県">栃木県</SelectItem>
              <SelectItem value="群馬県">群馬県</SelectItem>
              <SelectItem value="埼玉県">埼玉県</SelectItem>
              <SelectItem value="千葉県">千葉県</SelectItem>
              <SelectItem value="東京都">東京都</SelectItem>
              <SelectItem value="神奈川県">神奈川県</SelectItem>
              <SelectItem value="山梨県">山梨県</SelectItem>
              <SelectItem value="長野県">長野県</SelectItem>
              <SelectItem value="新潟県">新潟県</SelectItem>
              <SelectItem value="富山県">富山県</SelectItem>
              <SelectItem value="石川県">石川県</SelectItem>
              <SelectItem value="福井県">福井県</SelectItem>
              <SelectItem value="岐阜県">岐阜県</SelectItem>
              <SelectItem value="静岡県">静岡県</SelectItem>
              <SelectItem value="愛知県">愛知県</SelectItem>
              <SelectItem value="三重県">三重県</SelectItem>
              <SelectItem value="滋賀県">滋賀県</SelectItem>
              <SelectItem value="京都府">京都府</SelectItem>
              <SelectItem value="大阪府">大阪府</SelectItem>
              <SelectItem value="兵庫県">兵庫県</SelectItem>
              <SelectItem value="奈良県">奈良県</SelectItem>
              <SelectItem value="和歌山県">和歌山県</SelectItem>
              <SelectItem value="鳥取県">鳥取県</SelectItem>
              <SelectItem value="島根県">島根県</SelectItem>
              <SelectItem value="岡山県">岡山県</SelectItem>
              <SelectItem value="広島県">広島県</SelectItem>
              <SelectItem value="山口県">山口県</SelectItem>
              <SelectItem value="徳島県">徳島県</SelectItem>
              <SelectItem value="香川県">香川県</SelectItem>
              <SelectItem value="愛媛県">愛媛県</SelectItem>
              <SelectItem value="高知県">高知県</SelectItem>
              <SelectItem value="福岡県">福岡県</SelectItem>
              <SelectItem value="佐賀県">佐賀県</SelectItem>
              <SelectItem value="長崎県">長崎県</SelectItem>
              <SelectItem value="熊本県">熊本県</SelectItem>
              <SelectItem value="大分県">大分県</SelectItem>
              <SelectItem value="宮崎県">宮崎県</SelectItem>
              <SelectItem value="鹿児島県">鹿児島県</SelectItem>
              <SelectItem value="沖縄県">沖縄県</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-center pb-5" onSubmit={handleSubmit}>
        <CustomButton colorClass="btn-506D7D">登録</CustomButton>
      </div>
    </div>
  );
}

export default LineNotification;