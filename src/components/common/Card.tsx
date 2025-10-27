import React from 'react';

export default function Card({ children }:{ children:React.ReactNode }){
	return (<div className="border rounded-xl p-4 shadow-sm bg-white/90">{children}</div>);
}

