'use client';
import React from "react";
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image';
import CustomButton from '@/components/ui/custom-button';
import { useProfile } from '../../hooks/useProfile';

export const Profile = () => {
  const { data: session } = useSession();
  const { profile, isLoading, isError } = useProfile();

  if (isLoading) return <div className="text-2xl text-text-color bg-background-color min-h-screen w-full flex justify-center items-center">
    Loading...<br />
    잠깐만요.</div>;
  if (isError) return <div className="text-2xl text-text-color bg-background-color min-h-screen w-full flex justify-center items-center">
    プロフィールの読み込みに失敗しました。</div>;

  // プロフィールデータまたはセッションデータを使用
  const name = profile?.name || session?.user?.name || "";
  const age = profile?.age || "";
  const skinType = profile?.skin_type || "";
  const skinTrouble = profile?.skin_trouble || "";
  const avatar = profile?.avatar || session?.user?.image || '/default-avatar.png';

  return (
    session ? (
      <div className='font-genjyuu min-h-screen bg-background-color flex justify-center text-text-color'>
        <div className="max-w-sm text-center">
          <Image
            className="mb-6 justify-center"
            src={avatar}
            alt="User Avatar"
            width={100}
            height={100}
            style={{ borderRadius: '50%' }}
            priority
          />
          <p className="mb-6">お名前：{name}</p>
          <p className="mb-6">年代：{age}</p>
          <p className="mb-6">肌質：{skinType}</p>
          <p className="mb-6">お悩み：{skinTrouble}</p>
          <div className="w-full max-w-sm mt-4">
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

export default Profile;