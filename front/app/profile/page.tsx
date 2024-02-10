'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import axios from 'axios';
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import { useProfile } from '../hooks/useProfile';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomButton from '@/components/ui/custom-button';
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function EditProfile() {
  const router = useRouter()
  const { data: session } = useSession();
  const { profile, mutate } = useProfile();

  const [name, setName] = useState(profile?.name || session?.user?.name || "");
  const [age, setAge] = useState(profile?.age || "");
  const [skinType, setSkinType] = useState(profile?.skinType || "");
  const [skinTrouble, setSkinTrouble] = useState(profile?.skinTrouble || "");
  const [avatar, setAvatar] = useState(profile?.avatar || session?.user?.image || '/default-avatar.png');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const session = await getSession();
    const token = session?.accessToken;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const profileData = {
      name: name,
      age: age,
      skin_type: skinType,
      skin_trouble: skinTrouble,
      avatar: avatar,
    };

    try {
      const updatedProfile = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profiles/update`, profileData, {
        headers: headers,
        withCredentials: true
      });

      // mutateを使用してローカルキャッシュを更新
      mutate(updatedProfile.data);

      router.push('/my_page');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        // エラーレスポンスが存在し、その中にメッセージがある場合は表示する
        if (error.response && error.response.data && typeof error.response.data.message === 'string') {
          toast.error(error.response.data.message);
        } else {
          // その他のエラーの場合は汎用的なメッセージを表示
          toast.error("編集に問題が発生しました");
        }
      }
    }
  }

  return (
    session ? (
      <div className='bg-background-color flex justify-center h-screen p-10 text-text-color font-genjyuu'>
        <div className="w-full max-w-sm text-left">
          <div className="mb-6">
            <Label htmlFor="name">お名前</Label>
            <Input
              value={profile?.name || session?.user?.name}
              type="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="age">年代</Label>
            <Select onValueChange={value => setAge(value)}>
              <SelectTrigger>
                <SelectValue className="text-text-color" placeholder={profile?.age || "年代"} />
              </SelectTrigger>
              <SelectContent className="text-text-color">
                <SelectItem value="10代">10代</SelectItem>
                <SelectItem value="20代">20代</SelectItem>
                <SelectItem value="30代">30代</SelectItem>
                <SelectItem value="40代">40代</SelectItem>
                <SelectItem value="50代">50代</SelectItem>
                <SelectItem value="60代以上">60代以上</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-6">
            <Label htmlFor="skinType">肌質</Label>
            <Select onValueChange={setSkinType}>
              <SelectTrigger>
                <SelectValue className="text-text-color" placeholder={profile?.skin_type || "肌質"} />
              </SelectTrigger>
              <SelectContent className="text-text-color">
                <SelectItem value="乾燥肌">乾燥肌</SelectItem>
                <SelectItem value="混合肌">混合肌</SelectItem>
                <SelectItem value="脂性肌">脂性肌</SelectItem>
                <SelectItem value="普通肌">普通肌</SelectItem>
                <SelectItem value="敏感肌">敏感肌</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-6">
            <Label htmlFor="skinTrouble">肌悩み</Label>
            <Select onValueChange={setSkinTrouble}>
              <SelectTrigger>
                <SelectValue className="text-text-color" placeholder={profile?.skin_trouble || "肌悩み"} />
              </SelectTrigger>
              <SelectContent className="text-text-color">
                <SelectItem value="保湿">保湿</SelectItem>
                <SelectItem value="ニキビ">ニキビ</SelectItem>
                <SelectItem value="毛穴・黒ずみ">毛穴・黒ずみ</SelectItem>
                <SelectItem value="美白">美白</SelectItem>
                <SelectItem value="肌のハリ・弾力">肌のハリ・弾力</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-6">
            <Label htmlFor="avatar">アバター画像</Label>
            <Image
              src={avatar || session.user?.image || '/default-avatar.png'}
              alt="User Avatar"
              width={100}
              height={100}
              style={{ borderRadius: '50%' }}
            />
            <Input className="mt-6"
              type="file"
              id="avatar"
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setAvatar(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }
              }}
            />
          </div>
          <div className="w-full pt-4 pb-4" onClick={handleSubmit}>
            <CustomButton colorClass="btn-506D7D w-full">
              更新する
            </CustomButton>
          </div>
          <Link href='/my_page'>
            <Button className="text-md bg-F5F5F5 text-48352F w-full hover:bg-E0DBD2">
              キャンセル
            </Button>
          </Link>
        </div>
      </div>
    ) : null
  );
}