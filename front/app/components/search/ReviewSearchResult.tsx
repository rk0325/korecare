'use client';
import React, { useContext, useState, useCallback, useMemo } from 'react';
import { LoadingContext } from '../../contexts/LoadingContext';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';

const ReviewSearchResult = () => {
  const { isLoading } = useContext(LoadingContext);
  const { data: session } = useSession();
  const token = session?.accessToken;
  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  function truncateName(name: string, maxLength: number = 46): string {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  }

  return (
    <div className='pt-4'>
    </div>
  );
}

export default ReviewSearchResult;