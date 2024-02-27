import useSWR from 'swr'
import axios from 'axios'
import { useSession } from 'next-auth/react'

const fetcher = async ([url, token]: [string, string | undefined]) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axios.get(url, { headers }).then(res => res.data);
}

export function useProfile() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  // useSWRの第一引数に配列を使用してURLとトークンを渡す
  const { data, error, mutate } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profiles`, token], // URLとトークンを配列で渡す
    fetcher,
    {
      refreshInterval: 300000,
    }
  );

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}