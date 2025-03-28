export const enum UploadStatusEnum {
    Idle = 'Idle',
    Preload = 'Preload',
    Waiting = 'Waiting',
    Downloading = 'Downloading',
    Uploading = 'Uploading',
    Success = 'Success',
    Failed = 'Failed'
}

export interface UploadStatus {
    name: UploadStatusEnum
    text: string
    message: string
}

export const uploadStatuses: UploadStatus[] = [
    {
        name: UploadStatusEnum.Idle,
        text: 'Trong hàng đợi',
        message: ''
    },
    {
        name: UploadStatusEnum.Preload,
        text: 'Lấy thông tin',
        message: 'Đang lấy thông tin tệp'
    },
    {
        name: UploadStatusEnum.Waiting,
        text: 'Sẵn sàng',
        message: 'Sẵn sàng tải lên'
    },
    {
        name: UploadStatusEnum.Downloading,
        text: 'Tải xuống tệp',
        message: 'Đang tải xuống tệp từ URL'
    },
    {
        name: UploadStatusEnum.Uploading,
        text: 'Tải lên',
        message: 'Đang tải lên'
    },
    {
        name: UploadStatusEnum.Success,
        text: 'Thành công',
        message: 'Đã tải lên'
    },
    {
        name: UploadStatusEnum.Failed,
        text: 'Thất bại',
        message: 'Tải lên thất bại'
    }
]

export function getUploadStatus(name: UploadStatusEnum): UploadStatus
export function getUploadStatus(name: string): UploadStatus | undefined

export function getUploadStatus(name: UploadStatusEnum | string): UploadStatus | undefined {
    return uploadStatuses.find((uploadStatus) => uploadStatus.name === name)
}
