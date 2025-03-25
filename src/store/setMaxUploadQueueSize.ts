import { setState } from './useAppStore'

export function setMaxUploadQueueSize(maxUploadQueueSize: number): void {
    setState({ maxUploadQueueSize })
}
