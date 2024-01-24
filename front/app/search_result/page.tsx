'use client';
import React, { useContext } from 'react'
import Link from 'next/link'
import { CosmeticsContext } from '../contexts/CosmeticsContext';
import CustomButton from '@/components/ui/custom-button';
import Image from 'next/image';

export default function SearchResult() {
	const { cosmetics } = useContext(CosmeticsContext);

	const categories = ['化粧水', '美容液', 'クリーム'];

	return (
		<div className='bg-background-color min-h-screen text-text-color text-center'>
			<p className="text-2xl font-bold text-center justify-between pt-10">
				あなたにおすすめの韓国コスメはこちら！
			</p>
			{categories.map((category) => {
				const filteredCosmetics = cosmetics.filter(cosmetic => cosmetic.itemName.includes(category));
				if (filteredCosmetics.length === 0) {
					return null; // アイテムが存在しない場合は何も表示しない
				}
				return (
					<div key={category}>
						<h2 className="text-xl font-bold text-center pt-5">{category}</h2>
						<div className='flex flex-col md:flex-row md:space-x-4 p-8 justify-center flex-wrap'>
							{filteredCosmetics.map((cosmetic, index) => (
								<div key={index} className='flex flex-col items-center p-4'>
									<p className="pb-2">{cosmetic.itemName.length > 40 ? cosmetic.itemName.substring(0, 40) + '...' : cosmetic.itemName}</p>
									<Image
										src={cosmetic.mediumImageUrl}
										alt={cosmetic.itemName}
										width={500}
										height={500}
										className="responsive-image"
										style={{ objectFit: "contain", width: "auto" }}
									/>
									<p>{cosmetic.itemPrice}円</p>
									<Link href={`/cosmetic_details/${index}`}>
										<p className="text-blue-500">商品詳細へ</p>
									</Link>
								</div>
							))}
						</div>
					</div>
				);
			})}
			<br />
			<Link href='/home'>
				<div className="flex justify-center pb-10">
					<CustomButton colorClass="btn-506D7D">もう一度検索する</CustomButton>
				</div>
			</Link>
		</div>
	);
}