import axios, { AxiosResponse, AxiosError } from 'axios'
import { getSession } from 'next-auth/react';

// 認証トークンをヘッダーに付加するfetcher関数
const fetcherWithAuth = {
  get: async (path: string) => {
    const session = await getSession();
    const token = session?.accessToken;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = path
    return axios.get(url, {
      headers: headers,
      withCredentials: true
    })
    .then((res: AxiosResponse) => res.data)
    .catch((error: AxiosError) => {
      throw error;
    })
  },
  put: async (path: string, data: any) => {
    const session = await getSession();
    const token = session?.accessToken;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = path
    return axios.put(url, data, {
      headers: headers,
      withCredentials: true
    })
    .then((res: AxiosResponse) => res.data)
    .catch((error: AxiosError) => {
      throw error;
    })
  }
};

export default fetcherWithAuth