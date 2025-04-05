import useApp from 'antd/es/app/useApp'
import clsx from 'clsx'
import { HTMLAttributes, ReactNode } from 'react'
import { addPageUrlToUploadQueue } from '../helpers/addPageUrlToUploadQueue'
import { addSourceCodeToQueue } from '../helpers/addSourceCodeToQueue'
import { DroppedTextTypeEnum, guessDroppedTextType } from '../helpers/guessDroppedTextType'
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
    const { message } = useApp()

    const handleDropText = (text: string): void => {
        if (currentDir === undefined) return

        const droppedType: DroppedTextTypeEnum = guessDroppedTextType(text)
        switch (droppedType) {
            case DroppedTextTypeEnum.Url:
                addPageUrlToUploadQueue({
                    pageUrl: text,
                    destDir: currentDir
                })
                tryStartUploadFromQueue()
                break

            case DroppedTextTypeEnum.SourceCode:
                addSourceCodeToQueue({
                    sourceCode: text,
                    destDir: currentDir
                })
                tryStartUploadFromQueue()
                break

            default:
                message.error('Dữ liệu không hợp lệ')
        }
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
