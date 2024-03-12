'use client';
import React, { useMemo } from "react";
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image';
import CustomButton from '@/components/ui/custom-button';
import { useProfile } from '../../hooks/useProfile';
import axios from 'axios';
import useSWR from 'swr';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

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

  const { data: notificationStatus } = useSWR<{ receive_notifications_weather: boolean, receive_notifications_expiration_date: boolean }>(
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
  const weatherNotificationEnabled = notificationStatus?.receive_notifications_weather || false;
  const expirationDateNotificationEnabled = notificationStatus?.receive_notifications_expiration_date || false;

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
          <div className="text-left max-w-sm mx-auto">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">お名前</TableCell>
                  <TableCell>{name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">年代</TableCell>
                  <TableCell>{age}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">肌質</TableCell>
                  <TableCell>{skinType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">お悩み</TableCell>
                  <TableCell>{skinTrouble}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">お住まい</TableCell>
                  <TableCell>{prefecture}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">紫外線 / 乾燥注意通知</TableCell>
                  <TableCell>{weatherNotificationEnabled ? 'ON' : 'OFF'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">使用期限通知</TableCell>
                  <TableCell>{expirationDateNotificationEnabled ? 'ON' : 'OFF'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-center pt-4">
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