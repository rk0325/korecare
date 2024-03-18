'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react';
import { useProfile } from '../../hooks/useProfile';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Label } from "@/components/ui/label"
import {
  LogOut,
  Search,
  Heart,
  Menu,
  Smile,
  CloudSun,
  X,
  MessageCircleQuestion,
  PenLine,
} from "lucide-react"

const Modal = () => {
  const { data: session } = useSession();
  const { profile } = useProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
    setIsModalOpen(false);
    toast.loading('ログアウトしています...');
  };

  const handleClose = () => setIsModalOpen(false);

  const name = profile?.name || session?.user?.name || "";
  const avatar = profile?.avatar || session?.user?.image || '/default-avatar.png';

  const handleNavigation = async (url: string) => {
    await router.push(url);
    setIsModalOpen(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <>
      <div className="menu-button" onClick={() => setIsModalOpen(true)}>
        <Menu />
      </div>
      <div className={`modal ${isModalOpen ? 'modal-open' : ''}`} onClick={handleClose}>
        <div className="modal-box" onClick={e => e.stopPropagation()}>
          <div className="flex justify-end">
            <div onClick={handleClose} className="btn btn-ghost btn-circle">
              <X />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={avatar || session?.user?.image || '/default-avatar.png'}
              alt="User Avatar"
              width={80}
              height={80}
              style={{ borderRadius: '50%' }}
            />
            <Label className="text-base text-center mt-4">{name || session?.user?.name}さん</Label>
          </div>
          <div className="flex items-center cursor-pointer pt-5" onClick={() => handleNavigation('/home')}>
            <CloudSun className="mr-2 h-4 w-4" />
            <span>天気情報</span>
          </div>
          <div className="flex items-center cursor-pointer pt-4" onClick={() => handleNavigation('/my_page')}>
            <Smile className="mr-2 h-4 w-4" />
            <span>マイページ</span>
          </div>
          <div className="flex items-center cursor-pointer pt-4" onClick={() => handleNavigation('/search')}>
            <Search className="mr-2 h-4 w-4" />
            <span>韓国コスメ検索</span>
          </div>
          <div className="flex items-center cursor-pointer pt-4" onClick={() => handleNavigation('/favorite_cosmetics')}>
            <Heart className="mr-2 h-4 w-4" />
            <span>お気に入り</span>
          </div>
          <div className="flex items-center cursor-pointer pt-4" onClick={() => handleNavigation('/reviews')}>
            <PenLine className="mr-2 h-4 w-4" />
            <span>レビュー一覧</span>
          </div>
          <div className="flex items-center cursor-pointer pt-4" onClick={() => handleNavigation('/column')}>
            <MessageCircleQuestion className="mr-2 h-4 w-4" />
            <span>Q＆A</span>
          </div>
          <div className="flex items-center cursor-pointer pt-4" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>ログアウト</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;