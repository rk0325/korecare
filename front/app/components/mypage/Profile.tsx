'use client';
import React from "react";
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image';
import CustomButton from '@/components/ui/custom-button';
import { useProfile } from '../../hooks/useProfile';
import LineNotification from './LineNotification';

export const Profile = () => {
  const { data: session } = useSession();
  const { profile, isLoading, isError } = useProfile();

  if (isLoading) return <div className="text-2xl text-text-color bg-background-color min-h-screen w-full flex justify-center items-center">
    Loading...<br />
    잠깐만요.</div>;
  if (isError) return <div className="text-xl text-text-color bg-background-color min-h-screen w-full flex justify-center items-center">
    Loading...<br />
    잠깐만요.</div>;

  // プロフィールデータまたはセッションデータを使用
  const name = profile?.name || session?.user?.name || "";
  const age = profile?.age || "";
  const skinType = profile?.skin_type || "";
  const skinTrouble = profile?.skin_trouble || "";
  const avatar = profile?.avatar || session?.user?.image || '/default-avatar.png';
  const prefecture = profile?.prefecture || "";

  return (
    session ? (
      <div className='font-genjyuu min-h-screen bg-background-color flex justify-center text-text-color'>
        <div className="text-center justify-center">
          <div className="flex justify-center">
            <Image
              className="mb-6"
              src={avatar}
              alt="User Avatar"
              width={100}
              height={100}
              style={{ borderRadius: '50%' }}
              priority
            />
          </div>
          <p className="mb-6">お名前：{name}</p>
          <p className="mb-6">年代：{age}</p>
          <p className="mb-6">肌質：{skinType}</p>
          <p className="mb-6">お悩み：{skinTrouble}</p>
          <p className="mb-6">お住まい：{prefecture}</p>
          <div className="flex justify-center pt-2">
            <Link href='/profile'>
              <CustomButton
                colorClass="btn-506D7D"
              >
                編集する
              </CustomButton>
            </Link>
          </div>
          <LineNotification />
        </div>
      </div>
    ) : null
  );
}

export default Profile;