import { useAsyncEffect } from 'ahooks'
import { SubprocessPromise } from 'tinyspawn'
import { youtubeDl } from 'youtube-dl-exec'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { parseFileSize } from '../helpers/parseFileSize'
import { UploadItem } from '../store/types'
import { useUpdateUploadItem } from './useUpdateUploadItem'

export function useHandleUploadItemDownloading(uploadItem: UploadItem): void {
    const { update, setFailed } = useUpdateUploadItem(uploadItem)

    useAsyncEffect(async () => {
        if (uploadItem.statusName !== UploadStatusEnum.Downloading) return

        update({
            progress: 0,
            totalProgress: uploadItem.estimatedSize
        })

        if (uploadItem.pageUrl !== undefined) {
            let proc: SubprocessPromise

            const tempDownloadFilePath: string | undefined = uploadItem.tempDownloadFilePath
            if (tempDownloadFilePath === undefined) return

            try {
                proc = youtubeDl.exec(uploadItem.pageUrl, {
                    format: 'bv*+ba/b',
                    output: tempDownloadFilePath
                })
                if (proc.stdout === null) {
                    throw Error('Process không có stdout')
                }
            } catch (error) {
                setFailed(error)
                throw error
            }

            let maxProgress: number = 0
            let maxTotalProgress: number = 1

            proc.stdout.on('data', (chunk) => {
                const infoText: string = Buffer.from(chunk).toString('utf8').trim()
                const infoChunks: string[] = infoText.split(/\s+/).filter(Boolean)
                if (infoChunks[0] !== '[download]') return

                let progress: number = parseFloat(infoChunks[1]) / 100
                if (isNaN(progress)) return

                if (maxProgress < progress && progress < 1) {
                    maxProgress = progress
                }

                const rawTotalProgress: string | undefined =
                    infoChunks[3] === '~' ? infoChunks[4] : infoChunks[3]
                const totalProgress: number | undefined = parseFileSize(rawTotalProgress)
                if (totalProgress === undefined) return

                if (maxTotalProgress < totalProgress) {
                    maxTotalProgress = totalProgress
                }

                update({
                    progress: Math.floor(maxProgress * maxTotalProgress),
                    totalProgress: maxTotalProgress
                })
            })

            proc.stdout.on('close', () => {
                proc.kill()

                update({ statusName: UploadStatusEnum.Uploading })
            })
        }
    }, [uploadItem.statusName])
}
