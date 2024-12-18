import { ReactNode } from 'react'
import iconUrl from '../assets/images/icon-256.png'

export function WindowTitleBar(): ReactNode {
	return (
		<div className="flex justify-center items-center gap-2 h-titlebar px-4 text-sm app-region-drag select-none bg-zinc-900 text-zinc-400 z-50">
			<img className="h-4" src={iconUrl} alt="Icon" />
			{document.title}
		</div>
	)
}
