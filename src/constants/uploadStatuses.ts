export enum UploadStatusEnum {
	Pending = 'Pending',
	FetchingMetadata = 'FetchingMetadata',
	FetchedMetadata = 'FetchedMetadata',
	Downloading = 'Downloading',
	Uploading = 'Uploading',
	Success = 'Success',
	Failed = 'Failed'
}

export interface UploadStatus {
	name: UploadStatusEnum
	text: string
}

export const uploadStatuses: UploadStatus[] = [
	{
		name: UploadStatusEnum.Pending,
		text: 'Đang đợi'
	},
	{
		name: UploadStatusEnum.FetchingMetadata,
		text: 'Chuẩn bị'
	},
	{
		name: UploadStatusEnum.FetchedMetadata,
		text: 'Sẵn sàng'
	},
	{
		name: UploadStatusEnum.Downloading,
		text: 'Tải xuống'
	},
	{
		name: UploadStatusEnum.Uploading,
		text: 'Tải lên'
	},
	{
		name: UploadStatusEnum.Success,
		text: 'Thành công'
	},
	{
		name: UploadStatusEnum.Failed,
		text: 'Thất bại'
	}
]

export function getUploadStatus(name: UploadStatusEnum): UploadStatus {
	const uploadStatus: UploadStatus | undefined = uploadStatuses.find((status) => {
		return status.name === name
	})
	if (uploadStatus === undefined) {
		throw Error(`Trạng thái "${name}" là không hợp lệ`)
	}
	return uploadStatus
}
