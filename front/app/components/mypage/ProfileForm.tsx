'use client';
import React, { useState, useEffect } from "react";
import { useSession, getSession } from 'next-auth/react'
import Link from 'next/link'
import axios from 'axios';
import Image from 'next/image';
import { Label } from "@/components/ui/label"
import CustomButton from '@/components/ui/custom-button';

export const ProfileForm = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [skinType, setSkinType] = useState("");
  const [skinTrouble, setSkinTrouble] = useState("");
  const [avatar, setAvatar] = useState("");

  const fetchProfile = async () => {
    const session = await getSession();
    const token = session?.accessToken;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profiles/`, {
        headers: headers,
        withCredentials: true
      });

      const profile = response.data;
      setName(profile.name);
      setAge(profile.age);
      setSkinType(profile.skin_type);
      setSkinTrouble(profile.skin_trouble);
      setAvatar(profile.avatar);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('fetchProfile is called');
    if (session) {
      fetchProfile();
    }
  }, [session]);

  return (
    session ? (
      <div className='bg-background-color flex justify-center h-screen'>
        <div className="grid max-w-sm text-left">
          <Image
            src={avatar || session.user?.image || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            style={{ borderRadius: '50%' }}
            priority
          />
          <Label htmlFor="name">お名前</Label>
          {name || session.user?.name}さん
          <Label htmlFor="age">年代</Label>
          {age}
          <Label htmlFor="skinType">肌質</Label>
          {skinType}
          <Label htmlFor="skinTrouble">お悩み</Label>
          {skinTrouble}
          <div className="w-full max-w-sm">
            <Link href='/profile'>
              <CustomButton
                colorClass="btn-506D7D w-full"
              >
                編集する
              </CustomButton>
            </Link>
          </div>
        </div>
      </div>
    ) : null
  );
}

export default ProfileForm;