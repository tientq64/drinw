import { setState } from './useAppStore'

export function setIsDefaultSmartUpload(isDefaultSmartUpload: boolean): void {
    setState({ isDefaultSmartUpload })
}
