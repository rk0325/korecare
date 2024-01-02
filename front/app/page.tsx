'use client';
import { useSession } from 'next-auth/react';
import Login from './components/Login';
import Logout from './components/Logout';
import Image from 'next/image';

export default function Home() {
	const { data: session, status } = useSession();
	return (
		<div>
			{status === 'authenticated' ? (
				<div>
					<p>ようこそ、{session.user?.name}さん</p>
					<Image
            src={session.user?.image ?? ''}
            alt=""
            width={100}
            height={100}
            style={{ borderRadius: '80px' }}
          />
					<div>
						<Logout />
					</div>
				</div>
			) : (
				<Login />
			)}
		</div>
	);
}