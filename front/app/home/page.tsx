"use client";
import React from 'react'
import { useSession } from 'next-auth/react'
import SearchForm from '../components/search/SearchForm';

export default function Home() {
	const { data: session } = useSession();

	return (
		session ? (
			<div className='bg-background-color min-h-screen text-text-color text-center flex justify-center'>
				<div className='flex flex-col space-y-4 p-10'>
					<p>すべてのカテゴリを選択しても、どれか一つを選択しても検索できます。</p>
					<SearchForm />
				</div>
			</div>
		) : null
	);
}