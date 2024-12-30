import { FilesViewModeEnum } from '../constants/filesViewModes'
import { setState } from './useAppStore'

export function setFilesViewMode(filesViewMode: FilesViewModeEnum): void {
	setState({ filesViewMode })
}
