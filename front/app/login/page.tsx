'use client';
import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link'
import { Icons } from "@/components/ui/icons"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CustomButton from '@/components/ui/custom-button';
import CustomLoginForm from '../components/LoginForm';

export default function Login() {
	const { data: session, status } = useSession();

		if (status === 'loading') {
			return (
				<div className="text-2xl text-text-color bg-background-color min-h-screen w-full flex justify-center items-center">
					<div>Loading...</div>
				</div>
			);
		}

		if (status !== 'authenticated') {
			return (
				<div className='bg-background-color'>
					<div className="flex justify-center items-center h-screen">
						<Card className="border-line-color bg-background-color text-text-color w-[350px]">
							<CardHeader className="space-y-1">
								<CardTitle className="text-2xl">Login</CardTitle>
							</CardHeader>
							<CardContent className="grid gap-4">
								<div className="w-full flex justify-center">
									<CustomButton colorClass="w-full hover:bg-[#dfdddb]" onClick={() => signIn('google', { callbackUrl: '/home' }, { prompt: 'login' })} variant="outline">
										<Icons.google className="mr-2 h-4 w-4" />
										Google
									</CustomButton>
								</div>
								<div className="relative">
									<div className="absolute inset-0 flex items-center">
										<span className="border-line-color w-full border-t" />
									</div>
									<div className="relative flex justify-center text-s">
										<span className="text-text-color bg-background-color px-2 text-muted-foreground">
											Or continue with
										</span>
									</div>
								</div>
								<CustomLoginForm />
							</CardContent>
							<div className="relative mb-6">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full" />
								</div>
								<div className="relative flex justify-center text-s">
									<span className="text-text-color px-2 text-muted-foreground hover:text-blue-900">
									<Link href='/signup'>
											Sign up
									</Link>
									</span>
								</div>
							</div>
						</Card>
					</div>
				</div>
			);
	}
		return null;
}