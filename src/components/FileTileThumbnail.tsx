import { ReactNode, SyntheticEvent, useState } from 'react'
import { File } from '../helpers/getGoogleDrive'

interface FileTileThumbnailProps {
    file: File
}

const errorThumbnailLinks: Record<string, boolean> = {}

export function FileTileThumbnail({ file }: FileTileThumbnailProps): ReactNode {
    const thumbnailLink = file.thumbnailLink!

    const [hasError, setHasError] = useState<boolean>(errorThumbnailLinks[thumbnailLink] ?? false)

    const handleFileThumbnailLoad = (event: SyntheticEvent<HTMLImageElement>): void => {
        const image = event.currentTarget
        if (image.naturalWidth > 0) return
        setHasError(true)
        errorThumbnailLinks[thumbnailLink] = true
    }

    return (
        <>
            {!hasError && (
                <img
                    className="aspect-video object-cover"
                    src={thumbnailLink}
                    loading="lazy"
                    onError={handleFileThumbnailLoad}
                />
            )}
            {hasError && (
                <img
                    className="aspect-video object-scale-down"
                    src={file.iconLink ?? undefined}
                    loading="lazy"
                />
            )}
        </>
    )
}
