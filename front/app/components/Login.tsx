import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Icons } from "@/components/ui/icons"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomButton from '@/components/ui/custom-button';

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
					<CustomButton colorClass="w-full hover:bg-[#dfdddb]" onClick={() => signIn('google', {}, { prompt: 'login' })} variant="outline">
						<Icons.google className="mr-2 h-4 w-4" />
						Google
					</CustomButton>
				</div>
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="border-line-color w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs">
								<span className="text-text-color bg-background-color px-2 text-muted-foreground">
									Or continue with
								</span>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="mail@example.com" className="placeholder-muted" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" />
						</div>
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full" />
							</div>
							<div className="relative flex justify-center text-xs">
								<span className="text-text-color bg-background-color px-2 text-muted-foreground">
								Forgot your password?
								</span>
							</div>
						</div>
					</CardContent>
					<CardFooter>
					<CustomButton colorClass="btn-506D7D w-full">Login</CustomButton>
					</CardFooter>
						<div className="relative mb-6">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full" />
							</div>
						<div className="relative flex justify-center text-xs">
							<span className="text-text-color px-2 text-muted-foreground">
							Sign up
							</span>
						</div>
					</div>
				</Card>
				</div>
			</div>
		)
	}
	return null;
}