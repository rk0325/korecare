'use client';
import React, { useContext } from "react";
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image';
import CustomButton from '@/components/ui/custom-button';
import ProfileContext from '../../contexts/ProfileContext';

export const Profile = () => {
  const { data: session } = useSession();
  const { name, age, skinType, skinTrouble, avatar } = useContext(ProfileContext);

  return (
    session ? (
      <div className='bg-background-color flex justify-center h-screen'>
        <div className="max-w-sm text-center">
          <Image
            className="mb-6 justify-center"
            src={avatar || session.user?.image || '/default-avatar.png'}
            alt="User Avatar"
            width={100}
            height={100}
            style={{ borderRadius: '50%' }}
            priority
          />
          <p className="mb-6">お名前：{name || session.user?.name}</p>
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