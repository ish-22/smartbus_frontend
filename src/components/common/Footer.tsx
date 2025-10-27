export default function Footer(){
	return (
		<footer className="w-full bg-white/70 backdrop-blur border-t p-4 text-sm text-slate-500 text-center">
			© SmartBus {new Date().getFullYear()}
		</footer>
	);
}

