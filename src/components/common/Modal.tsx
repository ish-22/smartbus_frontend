import React from 'react';

export default function Modal({ open, children }:{ open:boolean; children:React.ReactNode }){
	if(!open) return null;
	return (
		<div className="fixed inset-0 bg-slate-700/30 flex items-center justify-center p-4">
			<div className="bg-white rounded p-4">{children}</div>
		</div>
	);
}



