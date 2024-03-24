'use client';
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation'
import axios from 'axios';
import useSWR from 'swr';
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import { useProfile } from '../hooks/useProfile';
import LineNotification from "../components/mypage/LineNotification";
import { ApiResponseNotification, Notification } from '../types/index';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { format, add } from 'date-fns';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarIcon } from "lucide-react"
import { ja } from 'date-fns/locale'
import { Calendar } from "@/components/ui/calendar"
import CustomButton from '@/components/ui/custom-button';
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertTriangle,
  Diamond,
  SearchCheck,
  HelpCircle,
  X,
  AlertCircle,
  PencilLine,
} from "lucide-react"

const axiosInstance = axios.create({
  withCredentials: true,
});

const fetcher = (url: string, headers: any) => axiosInstance.get(url, { headers }).then(res => res.data);

export default function EditProfile() {
  const router = useRouter()
  const { data: session } = useSession();
  const token = session?.accessToken;

  const headers = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const { profile, mutate } = useProfile();
  const [isSkinTypeModalOpen, setIsSkinTypeModalOpen] = useState(false);
  const [isLineInfoModalOpen, setIsLineInfoModalOpen] = useState(false);
  const [name, setName] = useState(profile?.name || session?.user?.name || "");
  const [age, setAge] = useState(profile?.age || "");
  const [skinType, setSkinType] = useState(profile?.skinType || "");
  const [skinTrouble, setSkinTrouble] = useState(profile?.skinTrouble || "");
  const [avatar, setAvatar] = useState(profile?.avatar || session?.user?.image || '/default-avatar.png');
  const [prefecture, setPrefecture] = useState(profile?.prefecture || "");
  const [notificationMap, setNotificationMap] = useState(new Map());
  const [editingNotificationId, setEditingNotificationId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingNotificationId, setDeletingNotificationId] = useState<number | null>(null);

  const handleSkinTypeModalClose = () => {
    setIsSkinTypeModalOpen(false);
  };

  const handleLineInfoModalClose = () => {
    setIsLineInfoModalOpen(false);
  };

  const openDeleteDialog = (id: number) => {
    setDeletingNotificationId(id);
    setIsDeleteDialogOpen(true);
  };

  function toISOStringLocal(date: Date) {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().split('T')[0];
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const session = await getSession();
    const token = session?.accessToken;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const profileData = {
      profile: {
        name: name,
        age: age,
        skin_type: skinType || profile?.skinType,
        skin_trouble: skinTrouble || profile?.skinTrouble,
        avatar: avatar,
        prefecture: prefecture,
      }
    };

    try {
      const updatedProfile = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profiles`, profileData, {
        headers: headers,
        withCredentials: true
      });

      mutate(updatedProfile.data);

      router.push('/my_page');
      toast.success("プロフィールを更新しました");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        if (error.response && error.response.data && typeof error.response.data.message === 'string') {
          toast.error(error.response.data.message);
        } else {
          toast.error("編集に問題が発生しました");
        }
      }
    }

    notifications.forEach(async (notification) => {
      try {
        const openDateISO = notification.openDate ? toISOStringLocal(notification.openDate) : null;
        const expiryDateISO = notification.expiryDate ? toISOStringLocal(notification.expiryDate) : null;
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cosmetic_usages`, {
          cosmetic_usage: {
            item_type: notification.productType,
            open_date: openDateISO,
            expiry_date: expiryDateISO,
          }
        }, {
          headers: headers,
          withCredentials: true
        });
        console.log('保存成功:', response.data);
      } catch (error) {
        console.error('保存失敗:', error);
      }
    });
  }

  const { data: notificationStatus } = useSWR<{ receive_notifications_weather: boolean, receive_notifications_expiration_date: boolean }>(
    token ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/status` : null,
    () => fetcher(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/status`, headers)
  );

  useEffect(() => {
    if (notificationStatus) {
      setNotificationMap(new Map([
        ['weather', notificationStatus.receive_notifications_weather],
        ['expiration_date', notificationStatus.receive_notifications_expiration_date]
      ]));
    }
  }, [notificationStatus]);

  const handleWeatherNotificationChange = useCallback(async (checked: boolean) => {
    setNotificationMap(new Map(notificationMap).set('weather', checked));

    if (checked) {

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/enable`,
          { notification_type: 'weather', enabled: true },
          { headers: headers, withCredentials: true }
        );
        console.log('天気通知設定有効化完了');
      } catch (error) {
        console.error('通知設定エラー:', error);
      }
    } else {

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/enable`,
          { notification_type: 'weather', enabled: false },
          { headers: headers, withCredentials: true }
        );
        console.log('天気通知設定無効化完了');
      } catch (error) {
        console.error('通知無効化エラー:', error);
      }
    }
  }, [headers, notificationMap]);

  const handleExpirationDateNotificationChange = useCallback(async (checked: boolean) => {
    setNotificationMap(new Map(notificationMap).set('expiration_date', checked));

    if (checked) {

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/enable`,
          { notification_type: 'expiration_date', enabled: true },
          { headers: headers, withCredentials: true }
        );
        console.log('使用期限通知設定有効化完了');
      } catch (error) {
        console.error('通知設定エラー:', error);
      }
    } else {

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/notifications/enable`,
          { notification_type: 'expiration_date', enabled: false },
          { headers: headers, withCredentials: true }
        );
        console.log('使用期限通知設定無効化完了');
      } catch (error) {
        console.error('通知無効化エラー:', error);
      }
    }
  }, [headers, notificationMap]);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleOpenDateSelect = (id: number, date: Date) => {
    const newExpiryDate = add(date, { months: 3 });
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, openDate: date, expiryDate: newExpiryDate } : notification
    ));
  };

  const addNotification = () => {
    if (notifications.length < 3) {
      const newId = notifications.length + 1;
      const newNotification = { id: newId, productType: '', openDate: null, expiryDate: null };
      setNotifications([...notifications, newNotification]);
    }
  };

  const removeNotification = async (id: number) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cosmetic_usages/${id}`, {
        withCredentials: true,
        headers: headers,
      });
      setNotifications(notifications.filter(notification => notification.id !== id));
      toast.success('通知設定を削除しました');
    } catch (error) {
      console.error('通知設定の削除に失敗しました:', error);
      toast.error('通知設定の削除に失敗しました');
    }
  };

  const handleProductTypeChange = (id: number, productType: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, productType: productType } : notification
    ));
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cosmetic_usages`, { headers });
        const formattedNotifications: Notification[] = response.data.map((notification: ApiResponseNotification) => ({
          id: notification.id,
          productType: notification.item_type,
          openDate: notification.open_date ? new Date(notification.open_date) : null,
          expiryDate: notification.expiry_date ? new Date(notification.expiry_date) : null,
        }));
        setNotifications(formattedNotifications);
      } catch (error) {
        console.error("通知設定の取得に失敗しました", error);
      }
    };

    fetchNotifications();
  }, [headers]);

  const getProductTypeInJapanese = (productType: string): string => {
    const productTypeMap: { [key: string]: string } = {
      lotion: "化粧水",
      serum: "美容液",
      cream: "クリーム",
    };

    return productTypeMap[productType] || "未選択";
  };

  return (
    session ? (
      <div className='flex justify-center p-10'>
        <div className="w-full max-w-sm text-left">
          <div className="mb-6">
            <Label htmlFor="avatar" className="block text-center mb-2 text-lg">アバター画像</Label>
            <div className="flex justify-center">
              <Image
                src={avatar || session.user?.image || '/default-avatar.png'}
                alt="User Avatar"
                width={100}
                height={100}
                style={{ borderRadius: '50%' }}
              />
            </div>
            <div className="flex justify-center">
              <Input className="mt-4 text-text-color/60"
                type="file"
                id="avatar"
                onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setAvatar(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }
                }}
              />
            </div>
          </div>
          <div className="mb-6">
            <Label htmlFor="name">お名前</Label>
            <Input
              value={profile?.name || session?.user?.name}
              type="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="age">年代</Label>
            <Select onValueChange={value => setAge(value)}>
              <SelectTrigger>
                <SelectValue className="text-text-color" placeholder={profile?.age || "年代"} />
              </SelectTrigger>
              <SelectContent className="text-text-color">
                <SelectItem value="10代">10代</SelectItem>
                <SelectItem value="20代">20代</SelectItem>
                <SelectItem value="30代">30代</SelectItem>
                <SelectItem value="40代">40代</SelectItem>
                <SelectItem value="50代">50代</SelectItem>
                <SelectItem value="60代以上">60代以上</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-6">
            <div className="flex items-center">
              <Label htmlFor="skinType">肌質</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="ml-1 p-1 rounded-full bg-background-color border border-gray-200 shadow cursor-pointer" onClick={() => setIsSkinTypeModalOpen(true)}>
                      <HelpCircle className="h-5 w-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>肌質とは？</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <input type="checkbox" id="skintype-modal" className="modal-toggle" checked={isSkinTypeModalOpen} onChange={() => setIsSkinTypeModalOpen(!isSkinTypeModalOpen)} />
            <div className="modal" id="skintype-modal" onClick={handleSkinTypeModalClose}>
              <div className="modal-box text-left" id="skintype-modal" onClick={e => e.stopPropagation()}>
                <div className="flex justify-end">
                  <div onClick={handleSkinTypeModalClose} id="skintype-modal" className="btn btn-ghost btn-circle">
                    <X />
                  </div>
                </div>
                <div className="flex justify-start items-start">
                  <SearchCheck className="mr-2 h-6 w-6" />
                  <div>
                    <p className="mb-2 text-md marked-text">あなたの洗顔後の肌の様子に一番近いものは？</p>
                    <p className="my-4 text-sm">・全体的につっぱり感があり、目元・口元・頬に乾燥を感じる→乾燥肌</p>
                    <p className="my-2 text-sm">・額や鼻はベタつきがあり、目元・口元・頬は乾燥を感じる→混合肌</p>
                    <p className="my-2 text-sm">・全体的にベタつきがあり、乾燥は感じない→脂性肌</p>
                    <p className="my-2 pb-2 text-sm">・ベタつきも乾燥もほとんど感じない→普通肌</p>
                  </div>
                </div>
                <div className="flex justify-start items-start">
                  <Diamond className="mr-2 h-6 w-6" />
                  <div>
                    <p className='text-sm'>以下のような特徴がある方は、敏感肌の可能性があります。</p>
                    <p className="my-4 text-sm">・いつも使っている化粧品がしみたり、かゆくなったりすることがある</p>
                    <p className="my-2 pb-4 text-sm">・化粧品でかぶれたり、つけるもので刺激を感じることがある</p>
                  </div>
                </div>
                <div className="flex justify-start items-start">
                  <AlertTriangle className="mr-2 h-6 w-6" />
                  <div>
                    <p className='text-sm'>こちらの質問は、肌質を断定するものではございません。</p>
                  </div>
                </div>
              </div>
            </div>
            <Select onValueChange={setSkinType}>
              <SelectTrigger>
                <SelectValue className="text-text-color" placeholder={profile?.skin_type || "肌質"} />
              </SelectTrigger>
              <SelectContent className="text-text-color">
                <SelectItem value="乾燥肌">乾燥肌</SelectItem>
                <SelectItem value="混合肌">混合肌</SelectItem>
                <SelectItem value="脂性肌">脂性肌</SelectItem>
                <SelectItem value="普通肌">普通肌</SelectItem>
                <SelectItem value="敏感肌">敏感肌</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-6">
            <Label htmlFor="skinTrouble">お悩み</Label>
            <Select onValueChange={setSkinTrouble}>
              <SelectTrigger>
                <SelectValue className="text-text-color" placeholder={profile?.skin_trouble || "お悩み"} />
              </SelectTrigger>
              <SelectContent className="text-text-color">
                <SelectItem value="保湿">保湿</SelectItem>
                <SelectItem value="ニキビ">ニキビ</SelectItem>
                <SelectItem value="毛穴・黒ずみ">毛穴・黒ずみ</SelectItem>
                <SelectItem value="美白">美白</SelectItem>
                <SelectItem value="肌のハリ・弾力">肌のハリ・弾力</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-6">
            <Label htmlFor="prefecture">お住まい</Label>
            <Select onValueChange={setPrefecture}>
              <SelectTrigger>
                <SelectValue className="text-text-color" placeholder={profile?.prefecture || "お住まい"} />
              </SelectTrigger>
              <SelectContent className="text-text-color">
                <SelectItem value="北海道">北海道</SelectItem>
                <SelectItem value="青森県">青森県</SelectItem>
                <SelectItem value="岩手県">岩手県</SelectItem>
                <SelectItem value="宮城県">宮城県</SelectItem>
                <SelectItem value="秋田県">秋田県</SelectItem>
                <SelectItem value="山形県">山形県</SelectItem>
                <SelectItem value="福島県">福島県</SelectItem>
                <SelectItem value="茨城県">茨城県</SelectItem>
                <SelectItem value="栃木県">栃木県</SelectItem>
                <SelectItem value="群馬県">群馬県</SelectItem>
                <SelectItem value="埼玉県">埼玉県</SelectItem>
                <SelectItem value="千葉県">千葉県</SelectItem>
                <SelectItem value="東京都">東京都</SelectItem>
                <SelectItem value="神奈川県">神奈川県</SelectItem>
                <SelectItem value="山梨県">山梨県</SelectItem>
                <SelectItem value="長野県">長野県</SelectItem>
                <SelectItem value="新潟県">新潟県</SelectItem>
                <SelectItem value="富山県">富山県</SelectItem>
                <SelectItem value="石川県">石川県</SelectItem>
                <SelectItem value="福井県">福井県</SelectItem>
                <SelectItem value="岐阜県">岐阜県</SelectItem>
                <SelectItem value="静岡県">静岡県</SelectItem>
                <SelectItem value="愛知県">愛知県</SelectItem>
                <SelectItem value="三重県">三重県</SelectItem>
                <SelectItem value="滋賀県">滋賀県</SelectItem>
                <SelectItem value="京都府">京都府</SelectItem>
                <SelectItem value="大阪府">大阪府</SelectItem>
                <SelectItem value="兵庫県">兵庫県</SelectItem>
                <SelectItem value="奈良県">奈良県</SelectItem>
                <SelectItem value="和歌山県">和歌山県</SelectItem>
                <SelectItem value="鳥取県">鳥取県</SelectItem>
                <SelectItem value="島根県">島根県</SelectItem>
                <SelectItem value="岡山県">岡山県</SelectItem>
                <SelectItem value="広島県">広島県</SelectItem>
                <SelectItem value="山口県">山口県</SelectItem>
                <SelectItem value="徳島県">徳島県</SelectItem>
                <SelectItem value="香川県">香川県</SelectItem>
                <SelectItem value="愛媛県">愛媛県</SelectItem>
                <SelectItem value="高知県">高知県</SelectItem>
                <SelectItem value="福岡県">福岡県</SelectItem>
                <SelectItem value="佐賀県">佐賀県</SelectItem>
                <SelectItem value="長崎県">長崎県</SelectItem>
                <SelectItem value="熊本県">熊本県</SelectItem>
                <SelectItem value="大分県">大分県</SelectItem>
                <SelectItem value="宮崎県">宮崎県</SelectItem>
                <SelectItem value="鹿児島県">鹿児島県</SelectItem>
                <SelectItem value="沖縄県">沖縄県</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-center pb-2 mt-8">
            <Label htmlFor="line-notification" className='text-lg'>LINE通知を受け取る</Label>
            <div className="flex items-center justify-end">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="ml-1 p-1 rounded-full bg-background-color border border-gray-200 shadow" id="lineinfo-modal" onClick={() => setIsLineInfoModalOpen(true)}>
                      <AlertCircle className="h-6 w-6" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>LINE通知について</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <input type="checkbox" id="lineinfo-modal" className="modal-toggle" checked={isLineInfoModalOpen} onChange={() => setIsLineInfoModalOpen(!isLineInfoModalOpen)} />
              <div className="modal" id="lineinfo-modal" onClick={handleLineInfoModalClose}>
                <div className="modal-box text-left" id="lineinfo-modal" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-end">
                    <div onClick={handleLineInfoModalClose} id="lineinfo-modal" className="btn btn-ghost btn-circle">
                      <X />
                    </div>
                  </div>
                  <div className="my-2 text-md">
                    <LineNotification />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center pt-2">紫外線 / 乾燥注意通知
            <Switch
              id="weather-notification"
              className="ml-2"
              checked={notificationMap.get('weather') ?? false}
              onCheckedChange={handleWeatherNotificationChange}
            />
          </div>
          <div className="flex items-center justify-center pt-4">使用期限通知
            <Switch
              id="expiration-date-notification"
              className="ml-2"
              checked={notificationMap.get('expiration_date') ?? false}
              onCheckedChange={handleExpirationDateNotificationChange}
            />
          </div>
          <Accordion type="single" collapsible className="w-full pt-4">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <AccordionItem key={notification.id} value={`details-${notification.id}`}>
                  <AccordionTrigger>使用期限通知設定 {index + 1}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {editingNotificationId !== notification.id ? (
                        <>
                          <div>製品タイプ: {getProductTypeInJapanese(notification.productType)}</div>
                          <div>開封日: {notification.openDate ? format(notification.openDate, "yyyy年M月d日", { locale: ja }) : "未設定"}</div>
                          <div>使用期限: {notification.expiryDate ? format(notification.expiryDate, "yyyy年M月d日", { locale: ja }) : "未設定"}</div>
                          {notification.openDate === null || notification.expiryDate === null ? (
                            <div className="items-start mb-2 text-sm">
                              <button onClick={() => setEditingNotificationId(notification.id)} className="flex items-center">
                                <PencilLine size={18} className='mr-2' /><span>編集する</span>
                              </button>
                            </div>
                          ) : null}
                          {notifications.length > 0 && (
                            <div className="pr-2 text-right cursor-pointer">
                              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                <DialogTrigger asChild>
                                  <div className="pt-2 text-c94a4a" onClick={() => openDeleteDialog(notification.id)}>× 削除</div>
                                </DialogTrigger>
                                <DialogContent className="font-genjyuu text-text-color">
                                  <DialogHeader>
                                    <DialogTitle>本当に削除しますか？</DialogTitle>
                                    <DialogDescription className="text-text-color pt-2">
                                      この操作は元に戻せません。<br />本当にこの通知設定を削除してもよろしいですか？
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter className="flex justify-center items-center pt-2">
                                    <button className="bg-F5F5F5 text-48352F hover:bg-E0DBD2 rounded-lg h-[40px] px-4 min-w-[60px] mr-1 mb-2" onClick={() => setIsDeleteDialogOpen(false)}>キャンセル</button>
                                    <button className="mb-2 btn-506D7D rounded-lg h-[40px] px-4 min-w-[60px]" onClick={() => {
                                      if (deletingNotificationId !== null) removeNotification(deletingNotificationId);
                                      setIsDeleteDialogOpen(false);
                                    }}>削除</button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                          {notifications.length < 3 && (
                            <div className="pr-2 text-right cursor-pointer">
                              <div onClick={addNotification}>＋ 追加</div>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div>
                            <Label htmlFor={`product_type-${notification.id}`}>製品タイプ</Label>
                            <Select onValueChange={(value) => handleProductTypeChange(notification.id, value)}>
                              <SelectTrigger className="text-text-color">
                                <SelectValue placeholder={getProductTypeInJapanese(notification.productType)} />
                              </SelectTrigger>
                              <SelectContent className="text-text-color">
                                <SelectItem value="lotion">化粧水</SelectItem>
                                <SelectItem value="serum">美容液</SelectItem>
                                <SelectItem value="cream">クリーム</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor={`open_date-${notification.id}`}>開封日</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant={"outline"} className="w-full justify-start text-left font-normal text-text-color">
                                  <CalendarIcon className="mr-2 h-4 w-4 text-text-color" />
                                  {notification.openDate ? format(notification.openDate, "yyyy年M月d日", { locale: ja }) : <span className="text-text-color/60">日付を選択</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 text-text-color">
                                <Calendar
                                  mode="single"
                                  selected={notification.openDate !== null ? notification.openDate : undefined}
                                  onSelect={(date) => {
                                    if (date !== undefined) {
                                      handleOpenDateSelect(notification.id, date);
                                    }
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <Label htmlFor={`expiry_date-${notification.id}`}>使用期限</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant={"outline"} className="w-full justify-start text-left font-normal text-text-color">
                                  <CalendarIcon className="mr-2 h-4 w-4 text-text-color" />
                                  {notification.expiryDate ? format(notification.expiryDate, "yyyy年M月d日", { locale: ja }) : <span className="text-text-color/60">日付を選択</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 text-text-color">
                                <Calendar
                                  mode="single"
                                  selected={notification.expiryDate !== null ? notification.expiryDate : undefined}
                                  onSelect={(date) => {
                                    setNotifications(notifications.map(n =>
                                      notification.id ? { ...n, expiryDate: date !== undefined ? date : null } : n
                                    ));
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="pt-2 pr-2 text-right cursor-pointer">
                            <div onClick={() => setEditingNotificationId(null)}>編集をキャンセル</div>
                          </div>
                        </>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <>
                <AccordionItem value="no-notifications">
                  <AccordionTrigger>使用期限通知設定</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-center py-4">通知設定がありません。</div>
                  </AccordionContent>
                </AccordionItem>
                <div className="pt-2 pr-2 text-right cursor-pointer">
                  <div onClick={addNotification}>＋ 追加</div>
                </div>
              </>
            )}
          </Accordion>
          <div className="w-full pt-10 pb-4 flex justify-center" onClick={handleSubmit}>
            <CustomButton colorClass="btn-506D7D">
              更新する
            </CustomButton>
          </div>
          <div className="w-full pb-10 flex justify-center">
            <Link href='/my_page'>
              <Button className="text-md rounded-lg bg-F5F5F5 text-48352F hover:bg-E0DBD2 active:scale-95 transition duration-300 ease-in-out">
                キャンセル
              </Button>
            </Link>
          </div>
        </div>
      </div>
    ) : null
  );
}