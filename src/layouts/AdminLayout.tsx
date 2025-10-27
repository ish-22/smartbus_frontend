import Head from 'next/head';
import Sidebar from '@/components/common/Sidebar';
import React from 'react';

type Props = { title?: string; children: React.ReactNode };

export default function AdminLayout({ title = 'Admin', children }: Props){
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<div className="flex min-h-screen">
				<Sidebar />
				<main className="flex-1 p-4">{children}</main>
			</div>
		</>
	);
}

