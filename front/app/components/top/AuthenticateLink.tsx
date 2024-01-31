import React from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import CustomButton from '@/components/ui/custom-button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function AuthenticateLink() {
  const handleLogin = async () => {
    toast.loading('ログインしています...');
    signIn('google', { callbackUrl: '/home' })
      .then(() => {
        toast.success('ログインに成功しました');
      })
      .catch(() => {
        toast.error('ログインに失敗しました');
      });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href='/profile'>
            <CustomButton
              colorClass="btn-506D7D w-full p-2 cursor-pointer font-genjyuu" onClick={handleLogin}
            >
              ログイン
            </CustomButton>
          </Link>
        </TooltipTrigger>
        <TooltipContent >
          <p>Googleでログインする</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}