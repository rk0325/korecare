'use client';
import React, { useContext, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { CosmeticsContext, Cosmetic } from '../contexts/CosmeticsContext';
import CustomButton from '@/components/ui/custom-button';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { FavoriteIconAnim } from '@/components/ui/FavoriteIconAnim';
import { PropagateLoader } from 'react-spinners';

export default function SearchResult() {
	const { cosmetics } = useContext(CosmeticsContext);
	const { data: session } = useSession();
	const token = session?.accessToken;
	const headers = useMemo(() => {
		return token ? { Authorization: `Bearer ${token}` } : {};
	}, [token]);
	const categories = ['化粧水', '美容液', 'クリーム'];
	const [favoriteStatus, setFavoriteStatus] = useState(new Map());
	const isLoading = cosmetics === null || cosmetics === undefined;

	const addToFavorites = useCallback(async (cosmetic: Cosmetic) => {
		console.log('cosmeticオブジェクトの中身', cosmetic);
		const favoriteCosmetic = {
			favorite_cosmetic: {
				user_id: session?.user?.id,
				item_code: cosmetic.id,
				name: cosmetic.itemName,
				brand: cosmetic.shopName,
				price: cosmetic.itemPrice,
				item_url: cosmetic.itemUrl,
				image_url: cosmetic.mediumImageUrl,
			}
		};

		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/favorite_cosmetics`, favoriteCosmetic, {
				headers: headers,
				withCredentials: true
			});
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	}, [headers, session?.user?.id]);

	const removeFromFavorites = useCallback(async (cosmeticId: string) => {
		try {
			const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/favorite_cosmetics/${cosmeticId}`, {
				headers: headers,
				withCredentials: true
			});
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	}, [headers]);

	const toggleFavorite = useCallback(async (cosmetic: Cosmetic) => {
		const currentStatus = favoriteStatus.get(cosmetic.id) || cosmetic.isFavorite;
		if (currentStatus) {
			await removeFromFavorites(cosmetic.id);
			setFavoriteStatus(prevStatus => new Map(prevStatus).set(cosmetic.id, false));
		} else {
			await addToFavorites(cosmetic);
			setFavoriteStatus(prevStatus => new Map(prevStatus).set(cosmetic.id, true));
		}
	}, [favoriteStatus, setFavoriteStatus, addToFavorites, removeFromFavorites]);

	const filterCosmeticsByFirstMatchingCategory = (cosmetic: Cosmetic) => {
		for (let category of categories) {
			if (cosmetic.itemName.includes(category)) {
				return category;
			}
		}
		return null;
	};

	function truncateName(name: string, maxLength: number = 46): string {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  }

	return (
		<div className='bg-background-color min-h-screen text-text-color text-center font-genjyuu'>
			<p className="text-xl text-center justify-between pt-10 p-6">
				あなたにおすすめの韓国コスメはこちら！
			</p>
			{isLoading ? (
				<div className="flex justify-center min-h-screen">
					<PropagateLoader color="#506D7D" />
				</div>
			) : (
				categories.map((category) => {
					if (!cosmetics) {
						return null;
					}
					const filteredCosmetics = cosmetics.filter(cosmetic => filterCosmeticsByFirstMatchingCategory(cosmetic) === category);
					return filteredCosmetics.length > 0 && (
						<div key={category}>
							<h2 className="text-xl text-left pt-8 pl-10">{category}</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-center'>
								{filteredCosmetics.map((cosmetic, index) => (
									<div key={index} className='relative flex flex-col items-center p-2'>
										<p className="line-clamp-2">
											{truncateName(cosmetic.itemName)}
										</p>
										<div className="relative">
											<Image
												src={cosmetic.mediumImageUrl}
												alt={cosmetic.itemName}
												width={500}
												height={500}
												style={{ objectFit: "contain", width: "auto" }}
											/>
											<button
												onClick={() => toggleFavorite(cosmetic)}
												className="absolute bottom-0 right-0 p-4 m-2"
												style={{ transform: 'translate(45%, 85%)' }}
											>
												<FavoriteIconAnim on={favoriteStatus.get(cosmetic.id) ?? false} />
											</button>
										</div>
										<p className='pt-10'>{cosmetic.itemPrice}円</p>
										<p>{cosmetic.shopName}</p>
										<Link href={cosmetic.itemUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
											商品ページへ
										</Link>
									</div>
								))}
							</div>
						</div>
					);
				})
			)}
			<Link href='/search'>
				<div className="flex justify-center pb-10">
					<CustomButton colorClass="btn-506D7D">もう一度検索する</CustomButton>
				</div>
			</Link>
		</div>
	);
}