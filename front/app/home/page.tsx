"use client";
import React from 'react'
import { useSession } from 'next-auth/react'
import SearchForm from '../components/search/SearchForm';import {
	AlertTriangle,
} from "lucide-react"

export default function Home() {
	const { data: session } = useSession();

	return (
		session ? (
			<div className='bg-background-color min-h-screen text-text-color text-center flex justify-center'>
				<div className='flex flex-col space-y-4 p-10'>
					<p>すべてのカテゴリを選択しても、どれか一つを選択しても検索できます。</p><br />
					<div className="flex justify-center">
						<AlertTriangle className="mr-1 h-6 w-5" />
						<p>検索結果が表示されない場合、該当商品がない可能性があります。</p><br />
					</div>
					<p>条件を変更して再度検索してみてください。</p>
					<SearchForm />
				</div>
			</div>
		) : null
	);
}