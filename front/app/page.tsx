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
					<p>セッションの期限：{session.expires}</p>
					<p>ようこそ、{session.user?.name}さん</p>
					<Image
            src={session.user?.image ?? ''}
            alt=""
            width={150}
            height={150}
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