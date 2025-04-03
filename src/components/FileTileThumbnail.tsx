import { ReactNode, SyntheticEvent, useState } from 'react'
import { getFileIconUrl } from '../constants/fileIconUrls'
import { File } from '../helpers/getGoogleDrive'

interface FileTileThumbnailProps {
    file: File
}

const errorThumbnailLinks: Record<string, boolean> = {}

export function FileTileThumbnail({ file }: FileTileThumbnailProps): ReactNode {
    const thumbnailLink: string | undefined = file.thumbnailLink ?? undefined

    const [isUseIcon, setIsUseIcon] = useState<boolean>(
        thumbnailLink === undefined ? true : (errorThumbnailLinks[thumbnailLink] ?? false)
    )

    const handleFileThumbnailLoad = (event: SyntheticEvent<HTMLImageElement>): void => {
        if (thumbnailLink === undefined) return

        const image = event.currentTarget
        if (image.naturalWidth > 0) return

        setIsUseIcon(true)
        errorThumbnailLinks[thumbnailLink] = true
    }

    return (
        <>
            {!isUseIcon && (
                <img
                    className="aspect-video object-cover"
                    src={thumbnailLink}
                    loading="lazy"
                    onError={handleFileThumbnailLoad}
                />
            )}
            {isUseIcon && (
                <div className="!flex aspect-video items-center justify-center">
                    <img className="size-6" src={getFileIconUrl(file)} loading="lazy" />
                </div>
            )}
        </>
    )
}
