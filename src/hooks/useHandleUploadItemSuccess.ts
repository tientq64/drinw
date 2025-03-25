import { useEffect } from 'react'
import { UploadStatusEnum } from '../constants/uploadStatuses'
import { checkFileBelongToCurrentDir } from '../helpers/checkFileBelongToCurrentDir'
import { DriveFile } from '../helpers/getGoogleDrive'
import { UploadItem } from '../store/types'
import { useUpdateUploadItem } from './useUpdateUploadItem'
import { addCurrentFile } from '../store/addCurrentFile'

export function useHandleUploadItemSuccess(uploadItem: UploadItem): void {
    const { update, setFailed } = useUpdateUploadItem(uploadItem)

    useEffect(() => {
        if (uploadItem.statusName !== UploadStatusEnum.Success) return

        const uploadedFile: DriveFile | undefined = uploadItem.uploadedFile
        if (uploadedFile === undefined) return

        if (!checkFileBelongToCurrentDir(uploadedFile)) return

        addCurrentFile(uploadedFile)
    }, [uploadItem.statusName])
}
