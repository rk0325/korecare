'use client';
import React, { useState, useContext } from 'react';
import { getSession } from 'next-auth/react'
import { LoadingContext } from '../../contexts/LoadingContext';
import toast from 'react-hot-toast';
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


interface SearchParams {
  skinType: string;
  skinTrouble: string;
  priceRange: string;
  productType: string;
  age: string;
}

interface ReviewSearchFormProps {
  onSearch: (params: SearchParams) => void;
}

const ReviewSearchForm: React.FC<ReviewSearchFormProps> = ({ onSearch }) => {
  const [skinType, setSkinType] = useState("");
  const [skinTrouble, setSkinTrouble] = useState("");
  const [age, setAge] = useState("");
  const { setIsLoading } = useContext(LoadingContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // ここで検索処理を実装します。例えば、APIを呼び出して検索結果を取得するなど。
    // 検索処理が完了したら、setIsLoading(false) を呼び出してローディング状態を解除します。

    setIsLoading(false); // 仮の処理
  }

  const resetForm = () => {
    setSkinType("");
    setSkinTrouble("");
    setAge("");
  };

  return (
    <div className='flex justify-center pt-8'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col md:flex-row md:space-x-4 space-y-8 md:space-y-0'>
          <Select value={skinType} onValueChange={value => setSkinType(value)}>
            <SelectTrigger className="w-[200px]">
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
          <Select value={skinTrouble} onValueChange={value => setSkinTrouble(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue className="text-text-color" placeholder="お悩み" />
            </SelectTrigger>
            <SelectContent className="text-text-color">
              <SelectItem value="保湿">保湿</SelectItem>
              <SelectItem value="ニキビ">ニキビ</SelectItem>
              <SelectItem value="毛穴・黒ずみ">毛穴・黒ずみ</SelectItem>
              <SelectItem value="美白">美白</SelectItem>
              <SelectItem value="肌のハリ・弾力">肌のハリ・弾力</SelectItem>
            </SelectContent>
          </Select>
          <Select value={age} onValueChange={value => setAge(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue className="text-text-color" placeholder="年代" />
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
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <button
              type="submit"
              className="btn-506D7D flex justify-center items-center rounded-md h-[40px] w-[80px]"
              disabled={!skinTrouble && !skinType && !age}
            >
              <Search size={18} className="mr-2" />
              検索
            </button>
            <button
              type="button"
              className="btn-506D7D flex justify-center items-center rounded-md h-[40px] w-[80px]"
              onClick={resetForm}
            >
              リセット
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReviewSearchForm;