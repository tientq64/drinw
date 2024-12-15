import { ReactNode, useEffect } from 'react'
import { Dir, useAppStore } from '../store/useAppStore'
import { useRequest } from 'ahooks'
import { getFiles } from '../helpers/getFiles'

export function CurrentDirFiles(): ReactNode {
	const currentAccount = useAppStore((state) => state.currentAccount)
	if (currentAccount === undefined) return

	const currentDirs = useAppStore((state) => state.currentDirs)
	const currentDir: Dir | undefined = currentDirs.at(-1)
	if (currentDir === undefined) return

	const filesGetter = useRequest(getFiles, { manual: true })

	useEffect(() => {
		filesGetter.run(currentAccount, {
			dirId: currentDir.dirId,
			trashed: false
		})
	}, [])

	return <div className="flex-1">{filesGetter.error?.stack}</div>
}
