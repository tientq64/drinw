import { setState } from './useAppStore'

export function setMasterEmail(masterEmail: string): void {
	setState({ masterEmail })
}
