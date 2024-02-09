'use client';
import React, { useState, useEffect } from 'react';
import SheetSide from './Sheet';
import Modal from './Modal';

const ResponsiveMenu = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // コンポーネントマウント時に実行
    handleResize();
    // ウィンドウのリサイズイベントに応じて実行
    window.addEventListener('resize', handleResize);

    // クリーンアップ関数
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        // スマホ用の表示（モーダル）
        <Modal />
      ) : (
        // PC用の表示（シート）
        <SheetSide />
      )}
    </div>
  );
};

export default ResponsiveMenu;