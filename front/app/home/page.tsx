'use client';
import React, { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import useSWR from 'swr';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Separator } from "@/components/ui/separator"
import {
  CloudSun,
  Droplets,
  MapPinned,
  HelpCircle,
  SunMedium,
  Cloudy,
  Umbrella,
  Snowflake,
  CloudFog,
  Zap
} from "lucide-react"

const fetcher = async ([url, token]: [string, string | undefined]) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axios.get(url, { headers }).then(res => res.data);
};

const calculateLevel = (value: number, max: number): number => {
  const level = Math.ceil((value / max) * 5);
  return level > 5 ? 5 : level; // 最大レベルを5に制限
};

interface LevelIconsProps {
  level: number;
  color: string;
  grayColor?: string;
  Icon: React.ElementType;
}

const LevelIcons: React.FC<LevelIconsProps> = ({ level, color, grayColor = "hsl(0, 0%, 80%)", Icon }) => {
  return (
    <div className="flex justify-center items-center">
      {[...Array(5)].map((_, index) => {
        const iconColor = index < level ? color : grayColor;
        return <div className="mx-1" key={index}><Icon size={24} color={iconColor} /></div>;
      })}
    </div>
  );
};

const getUviDescription = (uvi: number): string => {
  if (uvi <= 2) return "弱い";
  if (uvi <= 5) return "中程度";
  return "強い";
};

const getHumidityDescription = (humidity: number): string => {
  if (humidity < 40) return "低い";
  if (humidity < 50) return "やや低い";
  if (humidity < 60) return "適正";
  return "高い";
};

export default function Home() {
  const { data: session } = useSession();
  const { profile, isLoading: isProfileLoading } = useProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: weatherData, error } = useSWR(
    profile ? [`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/weather?prefecture_name=${profile.prefecture || "東京都"}`, session?.accessToken] : null,
    fetcher,
    { refreshInterval: 60000 } // 60秒ごとに再検証
  );

  if (isProfileLoading || !weatherData) {
    return <div className="text-xl text-text-color bg-background-color min-h-screen w-full flex justify-center items-center">
      <div>Loading...<br /><br />잠깐만요.</div>
    </div>;
  }

  if (error) return <div className='text-center justify-between'>データの取得に失敗しました。</div>;

  // UV指数と湿度のレベルを計算
  const uviLevel = calculateLevel(weatherData?.current_uvi, 10);
  const humidityLevel = calculateLevel(weatherData?.current_humidity, 100);

  // UV指数と湿度のレベルに応じた文言を取得
  const uviDescription = getUviDescription(weatherData?.current_uvi);
  const humidityDescription = getHumidityDescription(weatherData?.current_humidity);

  const uviColor = "#d4924f";
  const humidityColor = "#567485";

  const currentWeather = weatherData?.current_weather;
  const minTemp = weatherData?.min_temp;
  const maxTemp = weatherData?.max_temp;

  const translateWeather = (weather: string): string => {
    const mapping: { [key: string]: string } = {
      'Clear': '晴れ',
      'Clouds': '曇り',
      'Rain': '雨',
      'Snow': '雪',
      'Mist': '霧',
      'Fog': '霧',
      'Thunderstorm': '雷雨',
    };
    return mapping[weather] || weather;
  };

  const kelvinToCelsius = (kelvin: number): number => {
    return Math.round(kelvin - 273.15);
  };

  const getWeatherIcon = (weather: string) => {
    const icons: { [key: string]: JSX.Element } = {
      '晴れ': <SunMedium className="inline-block" color="#FDB813" />,
      '曇り': <Cloudy className="inline-block" color="#B1B1B1" />,
      '雨': <Umbrella className="inline-block" color="#5171A5" />,
      '雪': <Snowflake className="inline-block" color="#75BFFF" />,
      '霧': <CloudFog className="inline-block" color="#8E8E8E" />,
      '雷雨': <Zap className="inline-block" color="#FFD700" />,
    };
    return icons[weather] || null;
  };

  return (
    <div className='text-center justify-between'>
      <p className='text-xl pt-10 pb-4'>今日の{profile.prefecture || "東京都"}の天気情報</p>
      <div className='text-lg'>
        <p className="my-2">現在の天気 : {translateWeather(currentWeather)} {getWeatherIcon(translateWeather(currentWeather))}</p>
        <p className="my-2">最高気温 : {kelvinToCelsius(maxTemp)}°C</p>
        <p className="my-2">最低気温 : {kelvinToCelsius(minTemp)}°C</p>
        <Separator className="my-10 w-1/4 mx-auto" />
        <p className="my-2">現在のUV指数: {weatherData?.current_uvi}</p>
        <p className="my-2">{uviDescription}</p>
        <LevelIcons level={uviLevel} color={uviColor} Icon={CloudSun} />
        <Separator className="my-10 w-1/4 mx-auto" />
        <p className="my-2">現在の湿度: {weatherData?.current_humidity}%</p>
        <p className="my-2">{humidityDescription}</p>
        <LevelIcons level={humidityLevel} color={humidityColor} Icon={Droplets} />
        <p className="pt-6">最高UV指数: {weatherData?.daily_max_uvi}</p>
        <p className="my-2">最低湿度: {weatherData?.daily_min_humidity}%</p>
      </div>
      <div className="text-l flex items-center space-x-2 justify-center p-6">
        <label htmlFor="my-modal" className="text-md btn modal-button bg-background-color text-text-color shadow-md">
          UV指数と湿度の目安<HelpCircle className="ml-1 h-5 w-5" />
        </label>
      </div>
      <input type="checkbox" id="my-modal" className="modal-toggle" checked={isModalOpen} onChange={() => setIsModalOpen(!isModalOpen)} />
      <div className="modal">
        <div className="modal-box text-left">
          <p className="my-2 text-lg">・UV指数</p>
          <p className="my-2 text-md">1〜2が「弱い」、3〜5が「中程度」、6以上が「強い」といわれています。</p>
          <p className="my-2 text-md">WHOによると、UV指数が3以上の場合は屋外での日焼け止めの利用、長袖や帽子の着用が推奨されています。</p>
          <p className="my-2 text-lg">・湿度</p>
          <p className="my-2 text-md">お肌に最適な湿度は、50〜60%といわれています。</p>
          <p className="my-2 text-md pb-2">湿度が50%を下回っていたり、お肌の乾燥が気になった際はミスト化粧水やクリームを活用して、適宜うるおいを補給することをお勧めします。</p>
          <div className="my-2 text-md flex items-center">
            <MapPinned className="mr-2 h-16 w-16" />マイページにてお住まいを登録していただくと、住んでいる場所の情報が表示されます。登録前は、東京都の情報を表示しています。
          </div>
          <div className="modal-action">
            <button className="btn text-text-color" onClick={() => setIsModalOpen(false)}>閉じる</button>
          </div>
        </div>
      </div>
    </div>
  );
}