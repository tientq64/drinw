import { produce, WritableDraft } from 'immer'
import { create } from 'zustand'
import { FilesViewModeEnum } from '../constants/filesViewModes'
import { loadUserData } from '../helpers/loadUserData'
import { convertToBytes } from '../utils/convertToBytes'
import { Account, BreadcrumbItem, UploadItem } from './types'

/**
 * Store chính của ứng dụng. Store chỉ chứa các thuộc tính, không chứa các phương thức. Các phương
 * thức được tách ra thành các hàm riêng lẻ trong thư mục "src/store".
 */
export interface AppStore {
	masterEmail: string | undefined
	accounts: Account[]
	currentAccount: Account | undefined
	breadcrumbItems: BreadcrumbItem[]
	isInTrash: boolean
	filesViewMode: FilesViewModeEnum
	uploadItems: UploadItem[]
	isSmartUpload: boolean
	maxUploadingSize: number
	maxUploadingParallel: number
}

/**
 * State mặc định của app store.
 */
const defaultAppStore: AppStore = {
	masterEmail: undefined,
	accounts: [],
	currentAccount: undefined,
	breadcrumbItems: [],
	isInTrash: false,
	filesViewMode: FilesViewModeEnum.List,
	uploadItems: [],
	isSmartUpload: true,
	maxUploadingSize: convertToBytes(500, 'MB'),
	maxUploadingParallel: 10
}

export const useAppStore = create<AppStore>(() => defaultAppStore)

/**
 * Cập nhật state trong app store. Hàm này tương tự như hàm `setState` trong zustand. Ngoại trừ nếu
 * cập nhật thông qua một hàm, hàm đó sẽ sử dụng `immer` để cập nhật.
 */
export function setState(
	partial: AppStore | Partial<AppStore> | ((draft: WritableDraft<AppStore>) => void),
	replace?: false
): void {
	if (typeof partial === 'function') {
		const draftPartial: (state: AppStore) => AppStore | Partial<AppStore> = (state) =>
			produce(state, partial)
		useAppStore.setState(draftPartial, replace)
	} else {
		useAppStore.setState(partial, replace)
	}
}

/**
 * Lấy state hiện tại của app store.
 */
export const getState = useAppStore.getState

loadUserData()
