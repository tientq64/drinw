import { AccountKindEnum } from '../constants/accountKinds'
import { UploadStatusEnum } from '../constants/uploadStatuses'

export interface Account {
	clientEmail: string
	title?: string
	kindName?: AccountKindEnum
	mainDirId?: string
	tiktokUsernameFirstLetter?: string
	driveSize: number
	trashSize: number
	privateKey: string
}

export interface BreadcrumbItem {
	dirId: string
	dirName: string
}

/**
 * Một mục trong danh sách tải lên.
 */
export interface UploadItem {
	id: string
	/**
	 * Tải lên thông minh sẽ tự động chọn tài khoản và thư mục phù hợp để tải lên, dựa trên kiểu tài
	 * khoản, URL tải lên để xác định, vv.
	 */
	isSmartUpload: boolean
	/**
	 * Trạng thái hiện tại của mục này.
	 */
	status: UploadStatusEnum
	/**
	 * Số byte biểu thị cho quá trình tải lên, hoặc tải xuống.
	 */
	progressSize: number
	/**
	 * Tài khoản được sử dụng để tải lên. Sẽ được chọn tự động nếu sử dụng tải lên thông minh.
	 */
	account?: Account
	/**
	 * Tập tin tải lên sẽ được lưu vào thư mục này. Sẽ được chọn tự động nếu sử dụng tải lên thông
	 * minh.
	 */
	destDirId?: string
	/**
	 * Đường dẫn của tập tin cần tải lên, nếu chọn tải lên trên máy tính.
	 */
	sourceFilePath?: string
	/**
	 * URL trang chứa tập tin cần tải lên, nếu chọn tải lên thông qua URL.
	 */
	sourceUrl?: string
	/**
	 * Tiêu đề của video hoặc hình ảnh.
	 */
	title?: string
	/**
	 * Hình thu nhỏ của video hoặc hình ảnh này.
	 */
	thumbnailUrl?: string
	/**
	 * Xác định loại tài khoản sẽ được dùng để lưu tập tin này.
	 */
	kindName?: AccountKindEnum
	/**
	 * Id của người dùng khi tải lên qua URL.
	 */
	userId?: string
	/**
	 * Username của người dùng khi tải lên qua URL.
	 */
	userName?: string
	/**
	 * Id của tập tin khi tải lên qua URL.
	 */
	fileId?: string
	/**
	 * Phần mở rộng của tập tin cần tải lên.
	 */
	fileExt?: string
	/**
	 * Dung lượng của tập tin cần tải lên.
	 */
	fileSize?: number
	/**
	 * Kích cỡ của tập tin cần tải lên.
	 */
	fileResolution?: string
	/**
	 * Lý do khi tải lên thất bại.
	 */
	failedReason?: string
}
