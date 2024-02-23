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

    handleResize();
    window.addEventListener('resize', handleResize);

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