'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { useSession, getSession } from 'next-auth/react'
import toast from 'react-hot-toast';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomButton from '@/components/ui/custom-button';
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

  const [name, setName] = useState(session?.user?.name || "");
  const [age, setAge] = useState("");
  const [skinType, setSkinType] = useState("");
  const [skinTrouble, setSkinTrouble] = useState("");
  const [avatar, setAvatar] = useState(session?.user?.image || '/default-avatar.png');

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

    console.log(profileData);

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profiles/update`, profileData, {
        headers: headers,
        withCredentials: true
      });

      router.push('/my_page');  // APIリクエストが成功した後にリダイレクト

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
      <div className='bg-background-color flex justify-center h-screen p-10'>
        <div className="grid w-full max-w-sm text-left">
          <div>
            <Label htmlFor="name">お名前</Label>
            <Input
              value={name}
              type="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Select onValueChange={value => setAge(value)}>
            <SelectTrigger>
              <SelectValue className="text-text-color" placeholder="年代" />
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
          <Select onValueChange={setSkinType}>
            <SelectTrigger>
              <SelectValue className="text-text-color" placeholder="肌質" />
            </SelectTrigger>
            <SelectContent className="text-text-color">
              <SelectItem value="乾燥肌">乾燥肌</SelectItem>
              <SelectItem value="混合肌">混合肌</SelectItem>
              <SelectItem value="脂性肌">脂性肌</SelectItem>
              <SelectItem value="普通肌">普通肌</SelectItem>
              <SelectItem value="敏感肌">敏感肌</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setSkinTrouble}>
            <SelectTrigger>
              <SelectValue className="text-text-color" placeholder="肌悩み" />
            </SelectTrigger>
            <SelectContent className="text-text-color">
              <SelectItem value="保湿">保湿</SelectItem>
              <SelectItem value="ニキビ">ニキビ</SelectItem>
              <SelectItem value="毛穴・黒ずみ">毛穴・黒ずみ</SelectItem>
              <SelectItem value="美白">美白</SelectItem>
              <SelectItem value="肌のハリ・弾力">肌のハリ・弾力</SelectItem>
            </SelectContent>
          </Select>
          <div>
            <Label htmlFor="avatar">アバター画像</Label>
            <Input
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
          <div className="w-full" onClick={handleSubmit}>
            <CustomButton
              colorClass="btn-506D7D w-full"
            >
              登録する
            </CustomButton>
          </div>
        </div>
      </div>
    ) : null
  );
}