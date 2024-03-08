'use client';
import React from 'react';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { ja } from 'date-fns/locale'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const ExpirationDateNotification = () => {
  const [openDate, setOpenDate] = React.useState<Date>()
  const [expiryDate, setExpiryDate] = React.useState<Date>()

  return (
    <>
      <Label htmlFor="product_type">製品タイプ</Label>
      <div className="flex justify-center mb-4 w-full">
        <Select onValueChange={value => (value)}>
          <SelectTrigger className="text-text-color">
            <SelectValue placeholder="製品タイプを選択" />
          </SelectTrigger>
          <SelectContent className="text-text-color">
            <SelectItem value="化粧水">化粧水</SelectItem>
            <SelectItem value="美容液">美容液</SelectItem>
            <SelectItem value="クリーム">クリーム</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Label htmlFor="open_date">開封日</Label>
      <div className='flex justify-center mb-4'>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-[400px] justify-start text-left font-normal text-text-color"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-text-color" />
              {openDate ? format(openDate, "yyyy年M月d日", { locale: ja }) : <span className="text-text-color/60">日付を選択</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 text-text-color">
            <Calendar
              mode="single"
              selected={openDate}
              onSelect={setOpenDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Label htmlFor="expiry_date">使用期限</Label>
      <div className='flex justify-center mb-4'>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-[400px] justify-start text-left font-normal text-text-color"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-text-color" />
              {expiryDate ? format(expiryDate, "yyyy年M月d日", { locale: ja }) : <span className="text-text-color/60">日付を選択</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 text-text-color">
            <Calendar
              mode="single"
              selected={expiryDate}
              onSelect={setExpiryDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default ExpirationDateNotification;