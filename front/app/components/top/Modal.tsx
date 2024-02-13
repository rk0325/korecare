'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useProfile } from '../../hooks/useProfile';
import { Label } from "@/components/ui/label"
import {
  LogOut,
  Search,
  Heart,
  Menu,
  Smartphone,
  Smile
} from "lucide-react"

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
    setIsModalOpen(false); // ログアウト処理後にモーダルを閉じる
    toast.loading('ログアウトしています...');
  };

  const { data: session } = useSession();
  const { profile } = useProfile();

  // プロフィールデータまたはセッションデータを使用
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
    <div className="text-text-color font-genjyuu">
      <div className="menu-button" onClick={() => setIsModalOpen(true)}>
        <Menu />
      </div>
      <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <div className="flex flex-col items-center pt-4">
            <Image
              src={avatar || session?.user?.image || '/default-avatar.png'}
              alt="User Avatar"
              width={80}
              height={80}
              style={{ borderRadius: '50%' }}
            />
            <Label style={{ fontSize: '1rem', textAlign: 'center', marginTop: '1rem' }}>{name || session?.user?.name}さん</Label>
          </div>
          <div className="flex items-center cursor-pointer pt-8" onClick={() => handleNavigation('/my_page')}>
            <Smile className="mr-2 h-4 w-4" />
            <span>マイページ</span>
          </div>
          <div className="flex items-center cursor-pointer pt-6" onClick={() => handleNavigation('/home')}>
            <Search className="mr-2 h-4 w-4" />
            <span>韓国コスメ検索</span>
          </div>
          <div className="flex items-center cursor-pointer pt-6" onClick={() => handleNavigation('/favorite_cosmetics')}>
            <Heart className="mr-2 h-4 w-4" />
            <span>お気に入りコスメ</span>
          </div>
          <div className="flex items-center cursor-pointer pt-6" onClick={() => handleNavigation('/my_page')}>
            <Smartphone className="mr-2 h-4 w-4" />
            <span>LINE通知登録</span>
          </div>
          <div className="flex items-center cursor-pointer pt-6" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>ログアウト</span>
          </div>
          <div className="modal-action">
            <button className="btn text-text-color font-genjyuu" onClick={() => setIsModalOpen(false)}>閉じる</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;