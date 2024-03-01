'use client';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Column() {
  return (
    <>
      <div className="p-4 sm:p-6">
        <p className="text-2xl md:text-3xl text-center py-5 sm:py-10">Q＆A</p>
        <div className="bg-white rounded-md shadow-md max-w-5xl mx-auto px-5 sm:px-10 py-5 sm:py-10">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className='text-lg'>韓国コスメはなんで人気なの？</AccordionTrigger>
              <AccordionContent className='text-left'>
                <p className='my-1 text-lg marked-text'>製品の多様性</p>
                <p className='my-1'>韓国コスメは、さまざまな肌のお悩みに対応する製品や、敏感肌や乾燥肌、脂性肌など、さまざまな肌質に合わせた製品が豊富にそろっています。</p>
                <p className='my-1 text-lg marked-text'>手頃な価格</p>
                <p className='my-1'>韓国コスメは、高品質でありながらも比較的手頃な価格で提供されています。</p>
                <p className='my-1 text-lg marked-text'>美容大国</p>
                <p className='my-1'>「美容大国」と呼ばれる韓国では美容に対する関心が高く、これが高品質な製品の開発を促進しているといわれています。</p>
                <p className='my-1 text-lg marked-text'>K-POPや韓国ドラマの影響</p>
                <p className='my-1'>K-POPや韓国ドラマの人気に伴い、韓国のメイクやスキンケアが注目されるようになりました。推しが使っているものは自分も使いたくなりますよね！</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className='text-lg'>韓国コスメ購入時の注意点</AccordionTrigger>
              <AccordionContent className='text-left'>
                <p className='my-1'>ずばり、偽物に注意！です。</p>
                <p className='my-1'>韓国コスメを購入する際は、公式ショップから購入することをお勧めします。商品名やショップ名に「公式」と書いてあることをご確認いただけますと幸いです。</p>
                <p className='my-1'>なお、KoreCareの検索機能では、公式ショップの商品がヒットするようにしておりますが、購入される際は、念の為ご確認をお願いいたします。</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className='text-lg'>韓国コスメ用語と使い方</AccordionTrigger>
              <AccordionContent className='text-left'>
                <p className='my-1 text-lg marked-text'>トナー、スキン</p>
                <p className='my-1'>韓国コスメでは、化粧水のことをトナーやスキンといいます。</p>
                <p className='my-1 text-lg marked-text'>エッセンス、セラム、アンプル</p>
                <p className='my-1'>韓国コスメでは、美容液のことをエッセンス、セラム、アンプルといいます。</p>
                <p className='my-1 text-lg marked-text'>使い方</p>
                <p className='my-1'>日本では「化粧水→乳液→クリーム」の順番で使用することが多いですが、韓国コスメは基本的に「化粧水→美容液→クリーム」の順番で使用します。</p>
                <p className='my-1'>ただし、製品によって順番が前後する場合があるため、使用する際は商品ページなどをご確認いただけますと幸いです。</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}