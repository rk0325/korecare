import React from 'react'
import CustomButton from '@/components/ui/custom-button';

export default function Home() {
	return (
		<div className='bg-background-color min-h-screen text-text-color text-center'>
			<p className="text-2xl font-bold text-center justify-between p-10">
				あなたにぴったりの韓国コスメを見つけませんか？
			</p>
			<p className="text-center justify-between p-10">
				『アプリ名』は韓国コスメに特化した、ユーザーのスキンケアをサポートするサービスです。<br />
			</p>
			<p className="text-2xl font-bold text-center justify-between p-10">
			『アプリ名』でできること
			</p>
				<ul className="text-center">
					<li>韓国コスメを使用したことがないけれど興味がある方に向けて、お悩みや肌質別に韓国コスメを提案します。</li>
					<li>スキンケアコスメの買い忘れ・使用期限切れを防ぐサポートをします。</li>
					<li>お肌の大敵である紫外線や乾燥から、ユーザーのお肌を守るサポートをします。</li>
				</ul>
			<p className="text-2xl font-bold text-center justify-between mt-10 p-10">
			＼ たった1分 ／<br />
				あなたに合った韓国コスメを探そう</p>
			<div className="flex justify-center">
			<CustomButton colorClass="btn-506D7D">Start</CustomButton>
		</div>
	</div>
  );
}