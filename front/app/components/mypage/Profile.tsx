'use client';
import React, { useMemo } from "react";
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image';
import CustomButton from '@/components/ui/custom-button';
import { useProfile } from '../../hooks/useProfile';
import axios from 'axios';
import useSWR from 'swr';

const axiosInstance = axios.create({
  withCredentials: true,
});

const fetcher = (url: string, headers: any) => axiosInstance.get(url, { headers }).then(res => res.data);

export const Profile = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);
  const { profile, isLoading, isError } = useProfile();

    const { data: notificationStatus } = useSWR<{ receive_notifications: boolean }>(
    token ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/status` : null,
    () => fetcher(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/status`, headers)
  );

  if (isLoading) return <div className="text-xl text-text-color bg-background-color min-h-screen w-full flex justify-center items-center">
    Loading...<br />
    잠깐만요.</div>;
  if (isError) return <div className="text-xl text-text-color bg-background-color min-h-screen w-full flex justify-center items-center">
    Loading...<br />
    잠깐만요.</div>;

  const name = profile?.name || session?.user?.name || "";
  const age = profile?.age || "";
  const skinType = profile?.skin_type || "";
  const skinTrouble = profile?.skin_trouble || "";
  const avatar = profile?.avatar || session?.user?.image || '/default-avatar.png';
  const prefecture = profile?.prefecture || "";
  const notificationEnabled = notificationStatus?.receive_notifications || false;

  return (
    session ? (
      <div className='flex justify-center'>
        <div className="max-w-md w-full">
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
          <div className="text-center">
            <p className="mb-6">お名前　{name}</p>
            <p className="mb-6">年代　{age}</p>
            <p className="mb-6">肌質　{skinType}</p>
            <p className="mb-6">お悩み　{skinTrouble}</p>
            <p className="mb-6">お住まい　{prefecture}</p>
            <p className="mb-6">LINE通知　{notificationEnabled ? 'ON' : 'OFF'}</p>
          </div>
          <div className="flex justify-center pt-2">
            <Link href='/profile'>
              <CustomButton
                colorClass="btn-506D7D"
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