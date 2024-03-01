'use client';
import React, { useState, useEffect } from 'react';
import SheetSide from './Sheet';
import Modal from './Modal';

const ResponsiveMenu = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <>
      {isMobile ? (
        <Modal />
      ) : (
        <SheetSide />
      )}
    </>
  );
};

export default ResponsiveMenu;