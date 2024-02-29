"use client";
import React from 'react'
import { useSession } from 'next-auth/react'
import SearchForm from '../components/search/SearchForm';
import {
	AlertTriangle,
} from "lucide-react"

export default function Home() {
	const { data: session } = useSession();

	return (
		session ? (
			<>
				<div className='flex flex-col space-y-4 p-10'>
					<p className='text-3xl'>韓国コスメ検索</p>
					<div className="flex justify-center pt-4">
						<AlertTriangle className="mr-1 h-5 w-5" />
						<p className='marked-text'>「お悩み」は選択必須項目です。</p>
					</div>
					<SearchForm />
				</div>
			</>
		) : null
	);
}