import React from 'react'
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function AuthenticateLink() {
  const handleLogin = async () => {
    toast.loading('ログインしています...로그인 하고 있어요.');
    signIn('line', { callbackUrl: '/home' })
      .catch(() => {
        toast.error('ログインに失敗しました。로그인에 실패했습니다.');
      });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="p-2 cursor-pointer font-genjyuu" onClick={handleLogin}>
            ログイン
          </p>
        </TooltipTrigger>
        <TooltipContent >
          <p>LINEでログインする</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}