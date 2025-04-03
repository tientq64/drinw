import clsx from 'clsx'
import { HTMLAttributes, ReactNode } from 'react'
import { addSourceCodeToQueue } from '../helpers/addSourceCodeToQueue'
import { tryStartUploadFromQueue } from '../helpers/tryStartUploadFromQueue'
import { useCurrentDir } from '../hooks/useCurrentDir'
import { Dropper } from './Dropper'
import { Icon } from './Icon'

export function DriveDropper({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLElement>): ReactNode {
    const currentDir = useCurrentDir()

    const handleDropText = (text: string): void => {
        if (currentDir === undefined) return

        addSourceCodeToQueue({
            sourceCode: text,
            destDir: currentDir
        })
        tryStartUploadFromQueue()
    }

    return (
        <Dropper
            {...props}
            className={clsx('relative h-full', className)}
            onText={handleDropText}
            dragEnter={() => (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-500/30">
                    <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2">
                        <Icon name="upload" size={48} />
                        Thả ra để tải lên
                    </div>
                </div>
            )}
        >
            {children}
        </Dropper>
    )
}
