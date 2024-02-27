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
  Smartphone,
  Smile,
  Home,
  X,
  PenLine
} from "lucide-react"

const Modal = () => {
  const { data: session } = useSession();
  const { profile, isLoading, isError } = useProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  if (isLoading) return <div className="text-2xl text-text-color bg-background-color min-h-screen w-full flex justify-center items-center">
  Loading...<br />
  잠깐만요.</div>;
  if (isError) return <div className="text-xl text-text-color bg-background-color min-h-screen w-full flex justify-center items-center">
  Loading...<br />
  잠깐만요.</div>;

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
    setIsModalOpen(false);
    toast.loading('ログアウトしています...');
  };

  const handleClose = () => setIsModalOpen(false);

  const name = profile?.name || session?.user?.name || "";
  const avatar = profile?.avatar || session?.user?.image || '/default-avatar.png';
  const menuPosition = profile?.menu_position || 'left';

  const handleNavigation = async (url: string) => {
    await router.push(url);
    setIsModalOpen(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const menuButtonClass = menuPosition === 'left' ? 'menu-button-left' : 'menu-button-right';

  return (
    <>
      <div className={menuButtonClass} onClick={() => setIsModalOpen(true)}>
        <Menu />
      </div>
      <div className={`modal ${isModalOpen ? 'modal-open' : ''}`} onClick={handleClose}>
        <div className="modal-box" onClick={e => e.stopPropagation()}>
          <div className="flex justify-end">
            <button onClick={handleClose} className="btn btn-ghost btn-circle">
              <X />
            </button>
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
            <Home className="mr-2 h-4 w-4" />
            <span>ホーム</span>
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
          <div className="flex items-center cursor-pointer pt-4" onClick={() => handleNavigation('/my_page#line-notification')}>
            <Smartphone className="mr-2 h-4 w-4" />
            <span>LINE通知登録</span>
          </div>
          <div className="flex items-center cursor-pointer pt-4" onClick={() => handleNavigation('/column')}>
            <PenLine className="mr-2 h-4 w-4" />
            <span>コラム</span>
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