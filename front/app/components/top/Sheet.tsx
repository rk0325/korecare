'use client';
import React from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useProfile } from '../../hooks/useProfile';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
}  from "@/components/ui/sheet"
import {
  LogOut,
  Search,
  Heart,
  Menu,
  Smartphone,
  Smile
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"

const SHEET_SIDES = ["right"] as const
type SheetSide = (typeof SHEET_SIDES)[number]

export default function SheetSide() {
  const router = useRouter();
  const handleLogout = async () => {
    signOut({ callbackUrl: '/' }),
      toast.loading('ログアウトしています...');
  };

  const { data: session } = useSession();
  const { profile } = useProfile();

  // プロフィールデータまたはセッションデータを使用
  const name = profile?.name || session?.user?.name || "";
  const avatar = profile?.avatar || session?.user?.image || '/default-avatar.png';

  const handleNavigation = async (url: string) => {
    await router.push(url);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    session ? (
      <div className="p-2 cursor-pointer">
        {SHEET_SIDES.map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <div className='flex items-center justify-center font-genjyuu'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Menu className='menu-button' />
                    </TooltipTrigger>
                    <TooltipContent >
                      <p>メニューを表示する</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </SheetTrigger>
            <SheetContent side={side} className="text-text-color font-genjyuu w-[320px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle className="text-text-color">メニュー</SheetTitle>
              </SheetHeader>
              <div className="text-text-color p-4">
                <div className="flex flex-col items-center pt-4">
                  <Image
                    src={avatar || session.user?.image || '/default-avatar.png'}
                    alt="User Avatar"
                    width={100}
                    height={100}
                    style={{ borderRadius: '50%' }}
                  />
                  <Label style={{ fontSize: '1rem', textAlign: 'center', marginTop: '1rem' }}>{name || session.user?.name}さん</Label>
                </div>
                <SheetClose asChild>
                  <div className="flex items-center cursor-pointer pt-8" onClick={() => handleNavigation('/my_page')}>
                    <Smile className="mr-2 h-4 w-4" />
                    <span>マイページ</span>
                  </div>
                </SheetClose>
                <SheetClose asChild>
                  <div className="flex items-center cursor-pointer pt-6" onClick={() => handleNavigation('/home')}>
                    <Search className="mr-2 h-4 w-4" />
                    <span>韓国コスメ検索</span>
                  </div>
                </SheetClose>
                <SheetClose asChild>
                  <div className="flex items-center cursor-pointer pt-6" onClick={() => handleNavigation('/favorite_cosmetics')}>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>お気に入りコスメ</span>
                  </div>
                </SheetClose>
                <SheetClose asChild>
                  <div className="flex items-center cursor-pointer pt-6" onClick={() => handleNavigation('/line_notification')}>
                    <Smartphone className="mr-2 h-4 w-4" />
                    <span>LINE通知登録</span>
                  </div>
                </SheetClose>
                <SheetClose asChild>
                  <div className="flex items-center cursor-pointer pt-6" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>ログアウト</span>
                  </div>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    ) : null
  );
}