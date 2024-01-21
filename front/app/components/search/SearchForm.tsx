import React from 'react'
import Link from 'next/link'
import CustomButton from '@/components/ui/custom-button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
	Search,
} from "lucide-react"

const SearchForm = () => {
  return (
    <div className='bg-background-color min-h-screen text-text-color text-center flex justify-center pt-10'>
      <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue className="text-text-color" placeholder="肌質" />
          </SelectTrigger>
          <SelectContent className="text-text-color">
            <SelectItem value="乾燥肌">乾燥肌</SelectItem>
            <SelectItem value="混合肌">混合肌</SelectItem>
            <SelectItem value="脂性肌">脂性肌</SelectItem>
            <SelectItem value="普通肌">普通肌</SelectItem>
            <SelectItem value="敏感肌">敏感肌</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue className="text-text-color" placeholder="肌悩み" />
          </SelectTrigger>
          <SelectContent className="text-text-color">
            <SelectItem value="保湿">保湿</SelectItem>
            <SelectItem value="ニキビ">ニキビ</SelectItem>
            <SelectItem value="毛穴・黒ずみ">毛穴・黒ずみ</SelectItem>
            <SelectItem value="美白">美白</SelectItem>
            <SelectItem value="肌のハリ・弾力">肌のハリ・弾力</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue className="text-text-color" placeholder="金額" />
          </SelectTrigger>
          <SelectContent className="text-text-color">
            <SelectItem value="〜3,000円以内">〜3,000円以内</SelectItem>
            <SelectItem value="〜5,000円以内">〜5,000円以内</SelectItem>
            <SelectItem value="〜1万円以内">〜1万円以内</SelectItem>
            <SelectItem value="1万円以上">1万円以上</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue className="text-text-color" placeholder="形態" />
          </SelectTrigger>
          <SelectContent className="text-text-color">
            <SelectItem value="化粧水単品">化粧水単品</SelectItem>
            <SelectItem value="美容液単品">美容液単品</SelectItem>
            <SelectItem value="クリーム単品">クリーム単品</SelectItem>
            <SelectItem value="化粧水・美容液・クリームセット">化粧水・美容液・クリームセット</SelectItem>
          </SelectContent>
        </Select>
        <Link href='/search_result'>
          <div className="flex justify-center">
            <CustomButton colorClass="btn-506D7D"><Search size={18} className="mr-2" />検索</CustomButton>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SearchForm;