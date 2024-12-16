import { ReactNode } from 'react'
import iconUrl from '../assets/images/icon-256.png'

export function WindowTitleBar(): ReactNode {
	return (
		<div className="flex items-center gap-4 h-titlebar px-3 text-sm app-region-drag select-none bg-[#272727] z-50">
			<img className="h-4" src={iconUrl} alt="Icon" />
			{document.title}
		</div>
	)
}
