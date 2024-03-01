'use client';
import React from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useProfile } from '../../hooks/useProfile';
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
}  from "@/components/ui/sheet"
import {
  LogOut,
  Search,
  Heart,
  Menu,
  Smartphone,
  Smile,
  CloudSun,
  MessageCircleQuestion
} from "lucide-react"

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
                <Menu className='menu-button' />
              </div>
            </SheetTrigger>
            <SheetContent side={side} className="text-text-color font-genjyuu w-[320px] sm:w-[540px]">
              <div className="text-text-color p-4">
                <div className="flex flex-col items-center pt-4">
                  <Image
                    src={avatar || session.user?.image || '/default-avatar.png'}
                    alt="User Avatar"
                    width={100}
                    height={100}
                    style={{ borderRadius: '50%' }}
                  />
                  <Label className="text-base text-center mt-4">{name || session?.user?.name}さん</Label>
                </div>
                <SheetClose asChild>
                  <div className="flex items-center cursor-pointer pt-10" onClick={() => handleNavigation('/home')}>
                    <CloudSun className="mr-2 h-4 w-4" />
                    <span>天気情報</span>
                  </div>
                </SheetClose>
                <SheetClose asChild>
                  <div className="flex items-center cursor-pointer pt-6" onClick={() => handleNavigation('/my_page')}>
                    <Smile className="mr-2 h-4 w-4" />
                    <span>マイページ</span>
                  </div>
                </SheetClose>
                <SheetClose asChild>
                  <div className="flex items-center cursor-pointer pt-6" onClick={() => handleNavigation('/search')}>
                    <Search className="mr-2 h-4 w-4" />
                    <span>韓国コスメ検索</span>
                  </div>
                </SheetClose>
                <SheetClose asChild>
                  <div className="flex items-center cursor-pointer pt-6" onClick={() => handleNavigation('/favorite_cosmetics')}>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>お気に入り</span>
                  </div>
                </SheetClose>
                <SheetClose asChild>
                  <div className="flex items-center cursor-pointer pt-6" onClick={() => handleNavigation('/column')}>
                    <MessageCircleQuestion className="mr-2 h-4 w-4" />
                    <span>Q＆A</span>
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